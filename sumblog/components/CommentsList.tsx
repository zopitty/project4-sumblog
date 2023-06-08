import CommentDisplay from "./CommentDisplay";

interface Props {
  id: number;
  comment: string | null;
  createdAt: Date;
  author: { name: string | null };
  userId: string;
  postId: number;
  parentId: number | null;
}

export function CommentsList({ comments }: { comments: Props[] }) {
  if (!comments) {
    console.log("EMPTY ARRAY");
    return null;
  }
  return (
    <>
      {comments.map((comment) => (
        <CommentDisplay key={comment.id} {...(comment as any)} />
      ))}
    </>
  );
}
