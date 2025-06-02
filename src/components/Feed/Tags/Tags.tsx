import './Tags.css';

interface TagsProps {
  tags: string[];
  onRemove?: (tag: string) => void; 
}

function Tags({ tags, onRemove }: TagsProps) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <button key={tag} onClick={() => onRemove?.(tag)}>
          {tag} {onRemove && <span className="remove">✖</span>}
        </button>
      ))}
    </div>
  );
}

export default Tags;