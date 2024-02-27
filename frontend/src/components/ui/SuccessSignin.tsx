import { AlertCircle } from "lucide-react";

function SuccessSignin() {
  return (
    <div className="absolute backdrop-blur-lg right-2 bottom-2 flex p-3 rounded-lg border-2 border-emerald-400 bg-transparent text-emerald-400 sm:w-1/3 w-3/4">
      <div className="p-1">
        <AlertCircle className="h-4 w-4" />
      </div>
      <div>
        <div>Success.</div>
        <div>You have SignedIn successfully.</div>
      </div>
    </div>
  );
}

export default SuccessSignin;
