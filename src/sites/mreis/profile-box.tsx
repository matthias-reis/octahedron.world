export function ProfileBox() {
  return (
    <div class="bg-col-fg text-col-bg p-smd md:p-slg flex flex-col items-center gap-smd shrink-0 mt-smd md:mt-0 mx-auto md:mx-0 rounded-3xl">
      <img
        src="/reference/matze.jpg"
        alt="Matthias Reis"
        class="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full border-4 border-col-bg"
      />
      <p class="font-bold text-3xl font-display tracking-tight">
        Matthias Reis
      </p>
    </div>
  );
}
