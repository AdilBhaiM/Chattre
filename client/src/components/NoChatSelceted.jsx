import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 bg-gray-900 rounded-2xl ">
      <div className="max-w-md text-center space-y-2">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-2">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce bg-gray-600"
            >
              <MessageSquare color="#fff" className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl text-white font-bold">Welcome to Chattre!</h2>
        <p className="text-white text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;