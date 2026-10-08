"use client";

import { demoScripts } from "@/data/demos";
import type { Project } from "@/data/projects";
import DemoPlayer from "./DemoPlayer";
import ChainLensReplay from "./ChainLensReplay";

/** Picks the replay for a project. ChainLens is a graph; the rest are gates. */
const ProjectDemo = ({ id }: { id: NonNullable<Project["demo"]> }) =>
  id === "chainlens" ? <ChainLensReplay /> : <DemoPlayer script={demoScripts[id]} />;

export default ProjectDemo;
