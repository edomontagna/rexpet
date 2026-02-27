import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Upload, Sparkles, Image as ImageIcon, X, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCreditBalance } from "@/hooks/useCredits";
import { useStyles } from "@/hooks/useStyles";
import { useGenerationStatus } from "@/hooks/useGenerations";
import { uploadOriginalImage, getSignedUrl } from "@/services/storage";
import { requestGeneration } from "@/services/generations";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const Generate = () => {
  const { user } = useAuth();
  const { data: creditBalance, isLoading: creditsLoading } = useCreditBalance();
  const { data: styles, isLoading: stylesLoading } = useStyles();
  const queryClient = useQueryClient();

  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const { data: generationStatus } = useGenerationStatus(generationId, generating);

  // Cleanup object URL on unmount or file change
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Handle generation completion
  useEffect(() => {
    if (generationStatus?.status === "completed" && generationStatus.storage_path) {
      getSignedUrl("generated-images", generationStatus.storage_path)
        .then(setResultUrl)
        .catch(() => toast.error("Failed to load result"));
      setGenerating(false);
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      queryClient.invalidateQueries({ queryKey: ["generations"] });
    } else if (generationStatus?.status === "failed") {
      toast.error(generationStatus.error_message || "Generation failed. Credit has been refunded.");
      setGenerating(false);
      setGenerationId(null);
      queryClient.invalidateQueries({ queryKey: ["credits"] });
    }
  }, [generationStatus, queryClient]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResultUrl(null);
    setGenerationId(null);
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const removeFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedFile(null);
    setPreviewUrl(null);
    setResultUrl(null);
    setGenerationId(null);
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !selectedStyleId || !user || (creditBalance ?? 0) < 1) return;

    setGenerating(true);
    try {
      // Upload original image
      const original = await uploadOriginalImage(user.id, uploadedFile);

      // Request generation
      const result = await requestGeneration(original.id, selectedStyleId);
      setGenerationId(result.generation_id);
      toast.success("Generation started! This may take up to 60 seconds.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to start generation");
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="font-serif text-xl font-bold text-gradient-gold">Create Portrait</h1>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">
            {creditsLoading ? <Skeleton className="h-4 w-8 inline-block" /> : (creditBalance ?? 0)} credits
          </span>
        </div>
      </header>

      <div className="container px-4 lg:px-8 py-10 max-w-5xl">
        {/* Result display */}
        {resultUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 text-center"
          >
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Your Portrait is Ready!</h2>
            <div className="max-w-lg mx-auto rounded-xl overflow-hidden shadow-luxury border border-border">
              <img src={resultUrl} alt="Generated portrait" className="w-full" />
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
              <Button asChild className="rounded-full gap-2">
                <a href={resultUrl} download="rexpet-portrait.png">
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </Button>
              <Button
                variant="outline"
                className="rounded-full gap-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: "My RexPet Portrait", url: resultUrl });
                  } else {
                    navigator.clipboard.writeText(resultUrl);
                    toast.success("Link copied to clipboard");
                  }
                }}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </motion.div>
        )}

        {/* Generation in progress */}
        {generating && !resultUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12 text-center py-16"
          >
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-6" />
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Creating Your Portrait...</h2>
            <p className="text-muted-foreground">This usually takes 30-60 seconds. Please don't close this page.</p>
          </motion.div>
        )}

        {/* Upload + Style selection (hidden during generation) */}
        {!generating && !resultUrl && (
          <>
            {/* Step 1: Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">1. Upload your pet's photo</h2>
              <p className="text-muted-foreground mb-6">Choose a clear, well-lit photo of your pet</p>

              {previewUrl ? (
                <div className="relative inline-block">
                  <img src={previewUrl} alt="Pet preview" className="max-h-64 rounded-lg object-contain" />
                  <button
                    onClick={removeFile}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <label
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                    isDragging
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <Upload className="h-10 w-10 text-muted-foreground/40 mb-4" />
                  <span className="text-sm text-muted-foreground">Click to upload or drag & drop</span>
                  <span className="text-xs text-muted-foreground/60 mt-1">JPG, PNG, WebP up to 10MB</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </motion.div>

            {/* Step 2: Choose Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">2. Choose your style</h2>
              <p className="text-muted-foreground mb-6">Select the artistic style for your portrait</p>

              {stylesLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="aspect-square rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {styles?.map((style) => (
                    <Card
                      key={style.id}
                      onClick={() => setSelectedStyleId(style.id)}
                      className={`relative aspect-square overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedStyleId === style.id
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
                          : "hover:shadow-luxury"
                      }`}
                    >
                      {style.preview_url ? (
                        <img
                          src={style.preview_url}
                          alt={style.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-3">
                        <span className="font-serif text-sm font-semibold text-primary-foreground block">{style.name}</span>
                        {style.description && (
                          <span className="text-xs text-primary-foreground/70">{style.description}</span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Step 3: Generate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              {(creditBalance ?? 0) < 1 ? (
                <div className="p-6 rounded-xl border border-border bg-card mb-4">
                  <p className="text-muted-foreground mb-3">You need at least 1 credit to generate a portrait</p>
                  <Button asChild className="rounded-full">
                    <Link to="/dashboard">Buy Credits</Link>
                  </Button>
                </div>
              ) : (
                <Button
                  size="lg"
                  onClick={handleGenerate}
                  disabled={!uploadedFile || !selectedStyleId}
                  className="rounded-full px-10 h-13 text-base shadow-luxury"
                >
                  <ImageIcon className="mr-2 h-5 w-5" />
                  Generate Portrait (1 credit)
                </Button>
              )}
            </motion.div>
          </>
        )}

        {/* New portrait button after result */}
        {resultUrl && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setResultUrl(null);
                setGenerationId(null);
                removeFile();
              }}
            >
              Create Another Portrait
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;
