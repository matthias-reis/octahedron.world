import { largeImageUrl } from '~/components/image-helpers';

export default function PCSCContestPage() {
  return (
    <div
      class="min-h-screen bg-center bg-cover"
      style={{ 'background-image': `url(${largeImageUrl('pcsc-magenta')})` }}
    >
      <main class="max-w-4xl mx-auto py-5">PCSC Contest Page</main>
    </div>
  );
}
