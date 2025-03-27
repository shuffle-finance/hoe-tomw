# Task 3: Engineering Leadership Challenge

## Scenario
You've been Head of Engineering at RewardHub for just two weeks. The company is preparing to expand from its current city (Manchester) to a new city (Liverpool) in one month. The following situations all require attention from your engineering team of 5 developers:

1. **Security Vulnerability:** The security team has identified a critical vulnerability in the authentication service that could allow unauthorized access to user accounts. They estimate a fix would take 3-4 days of engineering time.

2. **Business-Critical Feature:** The business development team has secured 10 new merchant partnerships in Liverpool, but the merchant onboarding process is currently manual and error-prone. They've requested a self-service portal to be built before launch, estimated at 2 weeks of work.

3. **Infrastructure Costs:** The CFO has flagged that AWS costs have doubled in the last two months and are now significantly over budget. Initial investigation suggests unused resources and non-optimized database queries are the likely causes.

4. **Developer Productivity:** The CI/CD pipeline is taking 25+ minutes to run, causing significant delays in development. Engineers are frustrated and have started skipping tests to save time.

5. **Team Development:** One of your junior engineers is struggling with TypeScript and architectural patterns, causing their pull requests to require extensive revisions and delaying team progress.

## Task
As Head of Engineering, you need to create a plan for the next 3 weeks. Your response should include:

1. A prioritized list of these items with justification for your choices
2. Specific actions you would take for each item
3. What you would handle personally vs. what you would delegate (and to whom)
4. How you would communicate your decisions to:
   - Your engineering team
   - The CEO
   - Other stakeholders (business, finance, etc.)
5. Any processes or systems you would implement to better handle competing priorities in the future

## Time
You should spend approximately 20 minutes on this task.

There are no perfect answers, but your response should demonstrate how you balance technical needs, business requirements, team health, and communication in a leadership role.


# Plan!

Security:
   Are there any legal/data protection issues we _must_ address
   Are we happy with a business/reputational risk?
   Is it possible to monitor if this vunerability is happening or not?
   Do we have other quicker options than a fix?

   If not: DO IT!

Developer productivity
   Big risks on skipping tests!
   Can this be scaled to more machines to run quicker? (£££)
   Can we have any process changes that work around the issue?
   Timebox time with engineers to tackle it!

Developer productivity
   Since we're against the clock with a deadline, pair with a more senior engineer when starting a ticket to get architecture in place
         On complex tickets, encourage reaching out for help as they go along before having to rewrite PRs
   Actively avoid tickets which likely will be a struggle

Business portal:
   Can we deliver incrementally?
   Will a delay in the portal affect launch?
   Can the team support the manual work if time is critical?

Infra costs:
   Identify quick wins (turn off unused services, optimise worst query)
   Timebox time spent, and agree back-of-napkin additional costs
   Add infra updates to roadmap, after portal