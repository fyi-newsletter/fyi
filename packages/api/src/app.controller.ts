import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import {
  TrackingCapiFactoryService,
  TrackingEventDto,
  TrackingIntegrationProps,
  TrackingPlatformEnum,
} from '@fyi-newsletter/tracking';
import { ConfigService } from '@nestjs/config';
import { getBaseProps, IssueProps } from '@fyi-newsletter/shared';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  conversionsApiFactoryService = new TrackingCapiFactoryService();

  trackingIntegrations: TrackingIntegrationProps[];

  constructor(private readonly configService: ConfigService) {
    this.trackingIntegrations = [
      {
        ...getBaseProps(),
        platform: TrackingPlatformEnum.Meta,
        pixel: {
          id: this.configService.get<string>('META_PIXEL_ID') || '',
        },
        capi: {
          accessToken:
            this.configService.get<string>('META_CAPI_ACCESS_TOKEN') || '',
        },
      },
    ];
  }

  @Post('/track')
  track(@Body() body: TrackingEventDto) {
    const capiConfigs = this.trackingIntegrations.filter((i) => i.capi) || [];

    const capiIntegrations = capiConfigs.map((config) =>
      this.conversionsApiFactoryService.create(config),
    );

    capiIntegrations.forEach((service) => service.track(body.event, body.data));
  }

  @Get('/render-issue')
  @Header('Content-Type', 'text/html')
  renderIssue() {
    const htmlPath = join(__dirname, 'assets', 'email-templates', 'issue.html');

    const issue: IssueProps = {
      uuid: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      publicationDate: '2026-01-02',
      sections: [
        {
          header: '🧭 What’s Changing?',
          items: [
            {
              url: '#',
              header:
                'OpenAI bets big on audio as Silicon Valley declares war on screens (2m)',
              body: 'OpenAI has unified several engineering, product, and research teams over the past couple of months to overhaul its audio models. The company is reportedly preparing to launch an audio-first personal device in about a year. Its new audio model will sound more natural, be able to handle interruptions, and even speak when users are talking. The entire tech industry seems to be headed toward a future where screens become background noise and audio takes center stage.',
            },
            {
              url: '#',
              header: 'The Race between Waymo, Cybercab, and Uber (13m)',
              body: "One of the big transformations of this year will be robotaxis. Waymo will likely partner with Uber in many locations because Uber owns demand, but over time, Waymo will want to go direct. Cybercab will appear sometime this year and undercut both Uber and Waymo in price. Uber's demand for rides will go down pretty quickly once price drops - Waymo is currently more expensive than Uber, but it is still thriving because people prefer to ride without a driver.",
            },
          ],
        },
        {
          header: '🧰 Tools, Systems & Leverage',
          items: [
            {
              url: '#',
              header:
                'The man taking over the Large Hadron Collider – only to switch it off (6m)',
              body: "Mark Thomson is now the director general of CERN. One of the first things he will do during his term is to turn off the Large Hadron Collider (LHC) to make way for a major upgrade that will make the LHC more precise with its measurements of particles and their interactions. The upgrade will dominate Thomson's five-year tenure. The LHC will reach its end of life around 2041.",
            },
            {
              url: '#',
              header:
                'Starlink is beginning a significant reconfiguration of its satellite constellation focused on increasing space safety (1m)',
              body: 'SpaceX is lowering all Starlink satellites from around 550 km to around 480 km over the course of the year. The shell lowering will be tightly coordinated with other operators, regulators, and USSPACECOM. Condensing Starlink orbits will increase space safety, particularly with difficult-to-control risks like uncoordinated maneuvers and launches by other satellite operators.',
            },
          ],
        },
        {
          header: '💡 Worth Knowing',
          items: [
            {
              url: '#',
              header: '2026: The Great Engineering Divergence (5m)',
              body: "Once coding speed jumps, everything around it becomes a constraint. Developers' throughput is now capped by clarifying requirements, reviewing changes, validating correctness and performance, getting to production safely, and operating the product. The great engineering divergence will be determined by who raises that ceiling end-to-end. Organizations that update their processes to improve the non-code chokepoints will reap the largest rewards this year.",
            },
            {
              url: '#',
              header: 'Build Software. Build Users (4m)',
              body: "Writing a lot of tests doesn't always guarantee software quality. Engineers need to study target users more deeply to really understand how they will use their products. One way to do this is by creating AI users to test software. This can result in a feedback loop that allows engineers to iterate quickly.",
            },
          ],
        },
        {
          header: '🎁 Miscellaneous',
          items: [
            {
              url: '#',
              header:
                "Hasbro's Secret Weapon for Training Its Next Leaders: A Board Game (6m)",
              body: "Hasbro's 'Toy Tycoon' is a role-playing strategy game designed for up-and-coming leaders. The game takes a full day to play. Players confront a series of scenarios that test their managerial mettle. The game helps players think through how to manage their company's cash, time, and other resources, and to pivot when the most thoughtful plans fail. Players aim to build a brand, scale a business, and smartly apply market research.",
            },
            {
              url: '#',
              header: '2025 letter (80m)',
              body: 'Silicon Valley and the Communist Party are similar in that both are serious, self-serious, and completely humorless. They both tend to speak in either a bland corporate tone or a philosophical register. These two forces both aim to increase their centrality while weakening the agency of whole nation-states. This article looks at how the two parties differ in their AI efforts and what that might mean for the future of humanity.',
            },
          ],
        },
        {
          header: '⚡ Quick links',
          items: [
            {
              url: '#',
              header: 'Welcome to 2026 (4m)',
              body: 'A look at technological improvements in the recent past and the achievements they will unlock for humanity this year.',
            },
            {
              url: '#',
              header:
                "IPv6 just turned 30 and still hasn't taken over the world, but don't call it a failure (7m)",
              body: "IPv6 is not backward-compatible with IPv4, and it doesn't add any major improvements, so there is low incentive to adopt it.",
            },
            {
              url: '#',
              header: 'Technology is culture (2m)',
              body: 'If you want to understand how and where technological progress happens, you have to look at cultural drivers, not what academia is accomplishing.',
            },
          ],
        },
      ],
    };

    const template = readFileSync(htmlPath, 'utf-8');

    const content = issue.sections
      .map((s) => {
        const section = `
		<h2
            style="
              font-size: 1.35rem;
              font-family: Roboto, Tahoma, Arial, Helvetica, sans-serif;
              color: black;
              text-align: center;
              margin: 2rem 0rem 1.5rem;
            "
          >
            ${s.header}
          </h2>
		  `;

        const items = s.items
          .map(
            (item) => `
			<p
            style="
              font-size: 1rem;
              font-family: Roboto, Tahoma, Arial, Helvetica, sans-serif;
              color: black;
            "
          >
            <b>${item.header}</b>
          </p>
		  <p
            style="
              font-size: 1rem;
              font-family: Roboto, Tahoma, Arial, Helvetica, sans-serif;
              color: black;
            "
          >
            ${item.body}
          </p>`,
          )
          .join('');

        return section + items;
      })
      .join('');

    return template
      .replace(/{{publicationDate}}/g, issue.publicationDate)
      .replace(/{{content}}/g, content);
  }
}
