export default function (Alpine) {
    Alpine.directive("prefetch", (el, { modifiers }, { cleanup }) => {
        let hasPrefetched = false;
        let mouseListener = null;
        let observer = null;
        const hoverSupported = window.matchMedia("(hover: hover)").matches;

        const prefetch = () => {
            if (hasPrefetched) return;
            hasPrefetched = true;

            const href = el.href;
            if (!href) return;

            const link = document.createElement("link");
            link.rel = "prefetch";
            link.href = href;
            document.head.appendChild(link);

            releasePrefetch();
        };

        const releasePrefetch = () => {
            if (mouseListener) {
                el.removeEventListener("mouseenter", mouseListener);
                mouseListener = null;
            }
            if (observer) {
                observer.disconnect();
                observer = null;
            }
        };

        const setupListeners = () => {
            const useMouse = modifiers.includes("mouse");
            const useIntersect = modifiers.includes("intersect");

            if (useMouse || useIntersect) {
                if (useMouse) {
                    mouseListener = () => prefetch();
                    el.addEventListener("mouseenter", mouseListener);
                }
                if (useIntersect) {
                    observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) prefetch();
                            });
                        },
                        { threshold: 0.1 }
                    );
                    observer.observe(el);
                }
            } else {
                if (hoverSupported) {
                    mouseListener = () => prefetch();
                    el.addEventListener("mouseenter", mouseListener);
                } else {
                    observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) prefetch();
                            });
                        },
                        { threshold: 0.1 }
                    );
                    observer.observe(el);
                }
            }
        };

        setupListeners();

        cleanup(releasePrefetch);
    });
}
