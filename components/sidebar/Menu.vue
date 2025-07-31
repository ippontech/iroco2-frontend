<template>
  <aside
    class="flex flex-col bg-iroco-greenish-white items-start py-8 px-4 h-screen border-r border-r-slate"
  >
    <IroCOLogo variant="black" />

    <nav class="mt-12 flex flex-col w-full h-full">
      <span
        class="uppercase font-bold font-title text-sm text-iroco-greenish-white brightness-50 pb-2"
        >Dashboard</span
      >
      <SidebarItem
        to="/calculatrice"
        icon="ph:calculator"
        text="Calculatrice"
      />
      <SidebarItem to="/cur" icon="ph:chart-pie-slice" text="Analyse CUR" />
      <SidebarItem to="/scanner" icon="ph:chart-bar" text="Scanner" />
      <Separator class="my-4" />

      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0 translate-y-[30px]"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0 translate-y-[30px]"
      >
        <slot></slot>
      </Transition>
      <div class="mt-auto">
        <Separator class="my-4" />
        <SidebarItem
          to="/token"
          icon="ph:circles-four-duotone"
          text="Intégration Cloud"
        />
      </div>
    </nav>
  </aside>
</template>
