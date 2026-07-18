import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { TimelineItem } from "@/components/sections/shared/timeline-item";
import { Badge } from "@/components/ui/badge";
import { SECTION_IDS } from "@/constants/site";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      id={SECTION_IDS.experience}
      aria-labelledby="experience-heading"
      className="relative scroll-mt-28 overflow-hidden py-20 md:scroll-mt-32 md:py-28"
    >
      <SectionAtmosphere />
      <Container>
        <div>
          <SectionHeading
            headingId="experience-heading"
            eyebrow="Experience"
            title="Professional experience"
            description="Growing through real delivery — shipping features, learning architecture, and collaborating on production work."
          />
        </div>

        <ol className="relative space-y-6">
          {experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              index={index}
              isLast={index === experience.length - 1}
              title={item.role}
              subtitle={item.company}
              period={item.start === item.end ? item.start : `${item.start} – ${item.end}`}
            >
              <p className="mb-3 text-sm font-medium text-foreground">
                Responsibilities
              </p>
              <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-5 flex flex-wrap gap-2"
                aria-label="Technologies"
              >
                {item.tech.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </TimelineItem>
          ))}
        </ol>
      </Container>
    </section>
  );
}
