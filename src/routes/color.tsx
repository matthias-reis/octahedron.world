const Variants = () => (
  <>
    <div class="grow flex-1 bg-saturated-400"></div>
    <div class="grow flex-1 bg-complement"></div>
    <div class="grow flex-1 bg-decent-400"></div>
    <div class="grow flex-1 bg-decent-500"></div>
  </>
);

const Page = () => (
  <body class="bg-decent-100">
    <div class="w-150 mx-auto border">
      <div class="flex items-stretch justify-stretch h-7 red">
        <div class="grow flex-1 bg-main">Red</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 orange">
        <div class="grow flex-1 bg-main">Orange</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 tan">
        <div class="grow flex-1 bg-main">Tan</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 yellow">
        <div class="grow flex-1 bg-main">Yellow</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 lime">
        <div class="grow flex-1 bg-main">Lime</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 olive">
        <div class="grow flex-1 bg-main">Olive</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 green">
        <div class="grow flex-1 bg-main">Green</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 wood">
        <div class="grow flex-1 bg-main">Wood</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 cyan">
        <div class="grow flex-1 bg-main">Cyan</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7">
        <div class="grow flex-1 bg-main">Original</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 sky">
        <div class="grow flex-1 bg-main">Sky</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 blue">
        <div class="grow flex-1 bg-main">Blue</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 violet">
        <div class="grow flex-1 bg-main">Violet</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 purple">
        <div class="grow flex-1 bg-main">Purple</div>
        <Variants />
      </div>
      <div class="flex items-stretch justify-stretch h-7 carmine">
        <div class="grow flex-1 bg-main">Carmine</div>
        <Variants />
      </div>
    </div>
  </body>
);

export default Page;
