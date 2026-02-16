const Variants = () => (
  <div class="grid grid-cols-5 border-4 border-can2">
    <div class="h-5 bg-cas7 text-can2 text-xl font-bold p-2 flex items-center justify-center">
      SAT
    </div>
    <div class="h-5 bg-cad7 text-can2 text-xl font-bold p-2 flex items-center justify-center">
      DEC
    </div>
    <div class="h-5 bg-can7 text-can2 text-xl font-bold p-2 flex items-center justify-center">
      NEU
    </div>
    <div class="h-5 bg-cas5 text-can8 text-xl font-bold p-2 flex items-center justify-center">
      MAI
    </div>
    <div class="h-5 bg-cbs5 text-can8 text-xl font-bold p-2 flex items-center justify-center">
      SEC
    </div>
    <div class="h-5 bg-cas3">3</div>
    <div class="h-5 bg-cas4">4</div>
    <div class="h-5 bg-cas5">5</div>
    <div class="h-5 bg-cas6">6</div>
    <div class="h-5 bg-cas7">7</div>
    <div class="h-5 bg-cad1"></div>
    <div class="h-5 bg-cad2"></div>
    <div class="h-5 bg-cad5"></div>
    <div class="h-5 bg-cad7"></div>
    <div class="h-5 bg-cad8"></div>
    <div class="h-5 bg-can1"></div>
    <div class="h-5 bg-can2"></div>
    <div class="h-5 bg-can5"></div>
    <div class="h-5 bg-can7"></div>
    <div class="h-5 bg-can8"></div>
    <div class="h-5 bg-cbs3"></div>
    <div class="h-5 bg-cbs4"></div>
    <div class="h-5 bg-cbs5"></div>
    <div class="h-5 bg-cbs6"></div>
    <div class="h-5 bg-cbs7"></div>
    <div class="h-3 bg-can2 col-span-5"></div>
    <div class="h-5 bg-cc"></div>
    <div class="h-5 bg-cd"></div>
    <div class="h-5 bg-ce"></div>
    <div class="h-5 bg-cf"></div>
    <div class="h-5 bg-cg"></div>
  </div>
);

export default function Page() {
  return (
    <div class="bg-decent-100">
      <div class="max-w-4xl mx-auto">
        {[
          'petrol',
          'berry',
          'carmine',
          'sky',
          'wood',
          'tangerine',
          'lemon',
        ].map((color) => (
          <div class={`${color}`}>
            <div class="bg-cas6 text-can2 text-2xl font-bold p-2">{color}</div>
            <Variants />
          </div>
        ))}
      </div>
    </div>
  );
}
