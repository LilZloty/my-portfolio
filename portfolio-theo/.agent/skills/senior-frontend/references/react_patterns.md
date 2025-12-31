# React Patterns - Portfolio Project

## Custom Hooks Pattern

### 1. Section Observer Hook

Extracted pattern for tracking section visibility:

```typescript
import { useSectionObserver } from '@/lib/hooks';

export default function MySection() {
  const sectionRef = useSectionObserver<HTMLElement>('contact', { threshold: 0.3 });
  
  return <section ref={sectionRef}>...</section>;
}
```

### 2. GSAP Animation Hook

Reusable scroll-triggered animations:

```typescript
import { useGsapScrollAnimation, ANIMATION_PRESETS } from '@/lib/hooks';

const headerRef = useRef<HTMLDivElement>(null);

useGsapScrollAnimation(headerRef, {
  childSelector: '.animate-child',
  animation: ANIMATION_PRESETS.fadeInUp,
});
```

### 3. Animation Presets

Available presets in `ANIMATION_PRESETS`:
- `fadeInUp` - Standard content reveal
- `fadeInScale` - Cards with scale effect
- `slideInLeft` - Slide in from left
- `cardReveal` - 3D card flip reveal

## Component Organization

```
src/components/
├── canvas/          # Three.js/R3F components
├── sections/        # Page sections (Hero, Projects, etc)
└── ui/              # Reusable UI components
```

## State Management

Using Zustand for scroll state:

```typescript
import { useScrollStore } from '@/lib/store';

const { activeSection, setActiveSection } = useScrollStore();
```

## Anti-Patterns to Avoid

1. **Don't** register GSAP plugins inside components - do it at module level
2. **Don't** duplicate IntersectionObserver logic - use the hook
3. **Don't** inline animation configs - use presets for consistency
