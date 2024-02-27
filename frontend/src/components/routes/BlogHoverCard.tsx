import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Card {
  name: string;
  email: string;
}

function BlogHoverCard(props: Card) {
  return (
    <HoverCard>
      <HoverCardTrigger className="underline cursor-pointer">{props.name}</HoverCardTrigger>
      <HoverCardContent>{props.email}</HoverCardContent>
    </HoverCard>
  );
}

export default BlogHoverCard;
