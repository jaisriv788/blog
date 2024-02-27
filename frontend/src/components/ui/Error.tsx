import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Message {
  errorMessage: string;
}

function Error(props: Message) {
  return (
    <Alert
      variant="destructive"
      className="absolute right-2 bottom-2 w-3/4 sm:w-1/3 backdrop-blur-lg"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error (Retry)</AlertTitle>
      <AlertDescription>{props.errorMessage}</AlertDescription>
    </Alert>
  );
}

export default Error;
