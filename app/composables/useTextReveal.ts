import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nextTick, onMounted, onBeforeUnmount } from "vue";

export function useTextReveal(target: Ref<HTMLElement | null>) {
  let split: SplitType | null = null;
  let tl: gsap.core.Timeline | null = null;

  onMounted(async () => {
    await nextTick();

    if (!target.value) return;

    split = new SplitType(target.value, {
      types: "words,chars",
    });

    gsap.set(split.chars, {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    });

    tl = gsap.timeline({
      paused: true,
      repeat: -1,
      repeatDelay: 1,
    });

    tl.to(split.chars, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: 0.025,
      duration: 0.4,
      ease: "power3.out",
    })

      // jeda untuk dibaca
      .to({}, { duration: 15})

      // animasi balik
      .to(split.chars, {
        opacity: 0,
        y: -15,
        filter: "blur(8px)",
        stagger: {
          each: 0.015,
          from: "end",
        },
        duration: 0.25,
        ease: "power2.in",
      });

    ScrollTrigger.create({
      trigger: target.value,
      start: "top 80%",
      onEnter: () => tl?.play(),
      onLeaveBack: () => {
        tl?.pause(0);
      },
    });
  });

  onBeforeUnmount(() => {
    tl?.kill();
    split?.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  });
}