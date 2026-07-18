export interface EcosystemLink {
  label: string;
  href: string;
}

// The owner supplies this registry before publication. Keep AMI/ABVx attribution separate.
export const ecosystemLinks: EcosystemLink[] = [];

export const publisher = "AMI team";
export const developer = { label: "ABVx", href: "https://abvx.xyz" };
export const contactEmail = "abv@mn7r.com";
