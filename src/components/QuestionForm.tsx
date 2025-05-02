
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/ImageUploader";
import { toast } from "@/hooks/use-toast";
import { createQuestion } from "@/lib/questions-api";

// Define form schema
const questionSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }).max(150, { message: "Title must not exceed 150 characters" }),
  subject: z.string().min(1, { message: "Please select a subject" }),
  content: z.string().min(20, { message: "Question details must be at least 20 characters" }),
  imageUrl: z.string().optional(),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

export function QuestionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Initialize form
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      subject: "",
      content: "",
      imageUrl: "",
    },
  });
  
  // Handle image upload
  const handleImageUpload = (url: string) => {
    form.setValue("imageUrl", url);
  };
  
  // Handle form submission
  const onSubmit = async (values: QuestionFormValues) => {
    try {
      setIsSubmitting(true);
      
      await createQuestion(
        values.title,
        values.content,
        values.subject,
        values.imageUrl
      );
      
      toast({
        title: "Question posted!",
        description: "Your question has been submitted successfully.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error submitting question:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message || "There was an error submitting your question.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., How do I solve this quadratic equation?" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="computer_science">Computer Science</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Details</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your question in detail. Include relevant information that would help someone answer your question." 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormLabel>Attach an Image (Optional)</FormLabel>
              <FormControl>
                <ImageUploader onUpload={handleImageUpload} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Post Question"}
        </Button>
      </form>
    </Form>
  );
}
