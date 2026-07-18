import "server-only";

/**
 * True while `next build` is statically analyzing/prerendering routes.
 * Use to skip cookie/session work that cannot run at build time.
 */
export function isNextProductionBuild(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}
