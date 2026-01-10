import { LoaderCircle } from 'lucide-solid';

export function Loading() {
  return (
    <div class="flex items-center justify-center">
      <LoaderCircle class="text-decent-400 animate-spin" size={36} />
    </div>
  );
}
