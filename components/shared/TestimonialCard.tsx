import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export function TestimonialCard({ name, role, quote, avatar }: TestimonialCardProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-[#F0F0F0] shadow-sm p-6 gap-4">
      {/* Stars */}
      <div className="flex gap-1 shrink-0">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#F97316] text-[#F97316]" />
        ))}
      </div>
      {/* Quote grows to fill space, pushing avatar to bottom */}
      <p className="flex-1 text-[#6B7280] leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#F0F0F0] shrink-0">
        <Avatar>
          {avatar && <AvatarImage src={avatar} alt={name} />}
          <AvatarFallback>
            {name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-[#1A1A2E] text-sm">{name}</div>
          <div className="text-xs text-[#6B7280]">{role}</div>
        </div>
      </div>
    </div>
  );
}
