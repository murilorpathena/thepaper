interface Comment {
  $id: string;
  userId: string;
  text: string;
  createdAt: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora";
  if (mins < 60) return `há ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `há ${hrs} h`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `há ${days} d`;
  return `há ${Math.floor(days / 30)} mes`;
}

export function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-paper-400">
        Nenhum comentário ainda. Seja o primeiro!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.$id}
          className="rounded-lg border border-paper-100 bg-white p-4 dark:border-paper-800 dark:bg-paper-900"
        >
          <p className="text-sm text-paper-700 dark:text-paper-300">
            {comment.text}
          </p>
          <p className="mt-2 text-xs text-paper-400">
            {timeAgo(comment.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}