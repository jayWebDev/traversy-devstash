import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image as ImageIcon,
  Link,
  Folder,
} from "lucide-react";

export function TypeIcon({
  name,
  className,
}: {
  name: string | null | undefined;
  className?: string;
}) {
  switch (name) {
    case "Code":
      return <Code className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Terminal":
      return <Terminal className={className} />;
    case "StickyNote":
      return <StickyNote className={className} />;
    case "File":
      return <File className={className} />;
    case "Image":
      return <ImageIcon className={className} />;
    case "Link":
      return <Link className={className} />;
    default:
      return <Folder className={className} />;
  }
}
