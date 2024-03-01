import { AlertCircle } from "lucide-react";

function SessionEnd() {
  return (
    <div className="absolute backdrop-blur-lg right-2 bottom-2 flex p-3 rounded-lg border-2 border-black bg-transparent text-black w-3/4 sm:w-1/3">
      <div className="p-1">
        <AlertCircle className="h-4 w-4" />
      </div>
      <div>
        <div>Message.</div>
        <div>
          Your session is expired to continue <strong>SignIn again</strong>.
        </div>
      </div>
    </div>
  );
}

export default SessionEnd;
