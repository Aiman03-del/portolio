"use client";

import { CardStack, CardStackItem } from "./card-stack";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Luxury Performance",
    description: "Experience the thrill of precision engineering",
    imageSrc: "https://images.unsplash.com/photo-1518481615725-1d7a6b48a9a7?w=1600&q=80&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 2,
    title: "Elegant Design",
    description: "Where beauty meets functionality",
    imageSrc: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=1600&q=80&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 3,
    title: "Power & Speed",
    description: "Unleash the true potential of the road",
    imageSrc: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&q=80&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 4,
    title: "Timeless Craftsmanship",
    description: "Built with passion, driven by excellence",
    imageSrc: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1600&q=80&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 5,
    title: "Future of Mobility",
    description: "Innovation that moves you forward",
    imageSrc: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1600&q=80&auto=format&fit=crop",
    href: "#",
  },
];

export default function CardStackDemo() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl p-8">
        <CardStack items={items} initialIndex={0} autoAdvance intervalMs={2400} pauseOnHover showDots />
      </div>
    </div>
  );
}
