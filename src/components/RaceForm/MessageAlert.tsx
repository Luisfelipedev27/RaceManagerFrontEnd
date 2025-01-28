type MessageAlertProps = {
  message: string | null;
  type: "success" | "error";
};

const MessageAlert = ({ message, type }: MessageAlertProps) => {
  if (!message) return null;
  const colorClass = type === "success" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500";
  return <div className={`p-2 rounded ${colorClass}`}>{message}</div>;
};

export default MessageAlert;
