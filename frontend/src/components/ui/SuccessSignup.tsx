import { AlertCircle } from "lucide-react";

function SuccessSignup() {
  return (
    <div className="absolute backdrop-blur-lg right-2 bottom-2 flex p-3 rounded-lg border-2 border-emerald-400 bg-transparent text-emerald-400 w-3/4 sm:w-1/3">
      <div className="p-1">
        <AlertCircle className="h-4 w-4" />
      </div>
      <div>
        <div>Success.</div>
        <div>You have SignedUp successfully.</div>
      </div>
    </div>
  );
}

export default SuccessSignup;
