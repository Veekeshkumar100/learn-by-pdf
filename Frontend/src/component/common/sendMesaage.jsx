import React from "react";
import { Send } from "lucide-react";

const MessageInput = ({ value, onChange, onSend }) => {
  return (
    <div className="  justify-center w-full px-5 py-5 bg-white border-t border-slate-200 mt-5 rounded-b-2xl">
      
      <div className="
      
        flex items-center gap-3
        bg-slate-50
        border border-slate-200
        rounded-2xl
        px-4 py-2
        transition-all duration-300
        hover:border-emerald-400
        hover:shadow-md
        focus-within:border-emerald-500
        focus-within:ring-2
        focus-within:ring-emerald-200
      ">

        {/* Input */}
        <input
          type="text"
          placeholder="Type your message..."
          value={value}
          onChange={onChange}
          className="
            flex-1
            bg-transparent
            outline-none
            text-sm sm:text-base
            placeholder:text-slate-400
          "
        />

        {/* Send Button */}
        <button
          onClick={onSend}
          className="
            flex items-center justify-center
            w-10 h-10
            rounded-xl
            bg-emerald-500
            text-white
            transition-all duration-300
            hover:bg-emerald-600
            hover:scale-105
            active:scale-95
            shadow-sm
          "
        >
          <Send size={18} />
        </button>

      </div>
    </div>
  );
};

export default MessageInput;