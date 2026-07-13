import { CollaborationCard, CompanyValue, Feature, PricingPlan, ResourceItem, Testimonial } from '../types';

export const collaborationCards: CollaborationCard[] = [
  { id: 'c1', title: 'AI Insights', subtitle: 'Predictive engagement alerts' },
  { id: 'c2', title: 'Unified Inbox', subtitle: 'Resolve conversations faster' },
  { id: 'c3', title: 'Revenue Pulse', subtitle: 'Track growth in real time' },
  { id: 'c4', title: 'Smart Segments', subtitle: 'Target high-value cohorts' },
  { id: 'c5', title: 'Workflow Hubs', subtitle: 'Automate follow-ups' },
  { id: 'c6', title: 'Risk Signals', subtitle: 'Prevent churn early' },
];

export const features: Feature[] = [
  { id: 'f1', title: 'Analytics', description: 'Reporting and engagement metrics across every touchpoint.', icon: 'insights' },
  { id: 'f2', title: 'Community', description: 'Stronger customer relationships with proactive outreach.', icon: 'groups' },
  { id: 'f3', title: 'Automation', description: 'Workflow automation that removes manual busywork.', icon: 'bolt' },
  { id: 'f4', title: 'Security', description: 'Enterprise-grade compliance with continuous monitoring.', icon: 'security' },
  { id: 'f5', title: 'AI Copilot', description: 'Guided playbooks to accelerate operator response times.', icon: 'smart-toy' },
  { id: 'f6', title: 'Governance', description: 'Audit-ready activity trails and permission controls.', icon: 'verified' },
];

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Maya Chen', company: 'PulsePay', rating: 5, review: 'Circle delivered a 32% lift in engagement within two weeks.' },
  { id: 't2', name: 'Jordan Lee', company: 'Arcway Capital', rating: 5, review: 'The analytics dashboard is the best we have used for cohort insights.' },
  { id: 't3', name: 'Anita Singh', company: 'Brightlane', rating: 4, review: 'Automation flows freed up our success team for higher impact work.' },
  { id: 't4', name: 'Carlos Mendes', company: 'Northwind AI', rating: 5, review: 'Fast, reliable, and the support team is legendary.' },
  { id: 't5', name: 'Sasha Kim', company: 'Orbiton', rating: 5, review: 'We onboard new customers in half the time with Circle playbooks.' },
  { id: 't6', name: 'Emily West', company: 'LumenData', rating: 4, review: 'Beautiful UX with enterprise-grade reliability.' },
  { id: 't7', name: 'Arjun Patel', company: 'SummitPay', rating: 5, review: 'Reports are instant and executive-ready every Monday morning.' },
  { id: 't8', name: 'Noah Ruiz', company: 'Corebridge', rating: 5, review: 'The platform helped us stop churn before it started.' },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'p1',
    name: 'Starter',
    price: 'Free',
    highlight: false,
    features: ['Live dashboards', 'Community workspace', 'Email support', 'Up to 3 seats'],
  },
  {
    id: 'p2',
    name: 'Professional',
    price: '$29/month',
    highlight: true,
    features: ['Everything in Starter', 'Automation flows', 'Advanced analytics', 'Priority support'],
  },
  {
    id: 'p3',
    name: 'Enterprise',
    price: 'Custom',
    highlight: false,
    features: ['Dedicated success team', 'Security reviews', 'Custom SLAs', 'Unlimited seats'],
  },
];

export const resources: ResourceItem[] = [
  { id: 'r1', title: 'Engagement Benchmarks 2026', category: 'Report', summary: 'Quarterly metrics on SaaS engagement trends.', readTime: '6 min' },
  { id: 'r2', title: 'Automation Playbook', category: 'Guide', summary: 'A practical guide to workflow automation.', readTime: '8 min' },
  { id: 'r3', title: 'AI for Customer Success', category: 'Article', summary: 'How to deploy AI responsibly in customer ops.', readTime: '5 min' },
  { id: 'r4', title: 'Retention Scorecards', category: 'Template', summary: 'Measure churn risk with confidence.', readTime: '4 min' },
  { id: 'r5', title: 'Circle University', category: 'Course', summary: 'Certification for modern CS leaders.', readTime: '12 min' },
  { id: 'r6', title: 'Security Checklist', category: 'Checklist', summary: 'Enterprise readiness across teams.', readTime: '7 min' },
  { id: 'r7', title: 'Executive Brief', category: 'Brief', summary: 'Deliverable-ready insights for leadership.', readTime: '3 min' },
  { id: 'r8', title: 'Voice of Customer', category: 'Playbook', summary: 'Build customer feedback into every sprint.', readTime: '9 min' },
  { id: 'r9', title: 'Pipeline Health', category: 'Report', summary: 'Track revenue movements in real time.', readTime: '6 min' },
  { id: 'r10', title: 'AI Monitoring', category: 'Guide', summary: 'Governance essentials for AI workflows.', readTime: '10 min' },
];

export const companyValues: CompanyValue[] = [
  { id: 'v1', title: 'Trust at scale', description: 'Compliance and transparency embedded in every release.' },
  { id: 'v2', title: 'Customer first', description: 'We co-design experiences with customer leaders.' },
  { id: 'v3', title: 'Speed to value', description: 'Launch workflows in days, not quarters.' },
  { id: 'v4', title: 'Human + AI', description: 'Automation that empowers teams, not replaces them.' },
  { id: 'v5', title: 'Always-on support', description: 'Dedicated specialists in every time zone.' },
];
