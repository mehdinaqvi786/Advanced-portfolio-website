import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionAtmosphere } from "@/components/sections/shared/section-atmosphere";
import { TimelineItem } from "@/components/sections/shared/timeline-item";
import { SECTION_IDS } from "@/constants/site";
import { education } from "@/data/education";

export function EducationSection() {
  return (
    <section
      id={SECTION_IDS.education}
      aria-labelledby="education-heading"
      className="relative scroll-mt-28 overflow-hidden py-20 md:scroll-mt-32 md:py-28"
    >
      <SectionAtmosphere />
      <Container>
        <div>
          <SectionHeading
            headingId="education-heading"
            eyebrow="Education"
            title="Academic foundation"
            description="A software engineering journey grounded in systems thinking, product craft, and applied learning."
          />
        </div>

        <ol className="relative space-y-6">
          {education.map((item, index) => (
            <TimelineItem
              key={item.id}
              index={index}
              isLast={index === education.length - 1}
              title={`${item.degree} ${item.field}`}
              subtitle={item.institution}
              period={`${item.start} – ${item.end}`}
            >
              {item.highlights ? (
                <>
                  <p className="mb-3 text-sm font-medium text-foreground">
                    Focus areas
                  </p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-background/40 px-3 py-2.5 text-sm text-muted-foreground backdrop-blur-sm"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </TimelineItem>
          ))}
        </ol>
      </Container>
    </section>
  );
}
