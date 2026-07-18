export interface EcosystemLink {
  label: string;
  href: string;
}

// The owner supplies this registry before publication. Keep AMI/ABVx attribution separate.
export const ecosystemLinks: EcosystemLink[] = [
  { label: "MN7R", href: "https://mn7r.com/" },
  { label: "CR0PTO", href: "https://cr0pto.com/" },
  { label: "1D3X", href: "https://1d3x.com/" },
  { label: "Spike", href: "https://spike.1d3x.com/" },
  { label: "UGA", href: "https://uga.1d3x.com/" },
  { label: "Liqua", href: "https://liqua.cr0pto.com/" }
];

export const publisher = "AMI team";
export const developer = { label: "ABVx", href: "https://abvx.xyz" };
export const contactEmail = "abv@mn7r.com";
