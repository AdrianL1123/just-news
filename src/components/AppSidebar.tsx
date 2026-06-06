import { Link, useParams } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { COUNTRIES } from "@/config/nav";

export function AppSidebar() {
  const { country: activeCountry, category: activeCategory } = useParams({
    strict: false,
  });

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="px-2 py-1.5">
          <span className="font-serif text-[18px] tracking-[-0.2px] select-none">
            Just<span className="text-primary">.</span>News
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {COUNTRIES.map((country, idx) => (
          <div key={country.code}>
            {idx > 0 && <SidebarSeparator />}
            <SidebarGroup>
              <SidebarGroupLabel className="text-[11px] font-semibold tracking-[0.12em] uppercase text-foreground/50">
                {country.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {country.categories.map(({ id, label, Icon }) => (
                    <CategoryMenuItem
                      key={id}
                      countryCode={country.code}
                      categoryId={id}
                      label={label}
                      Icon={Icon}
                      isActive={activeCountry === country.code && activeCategory === id}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

interface CategoryMenuItemProps {
  countryCode: string;
  categoryId: string;
  label: string;
  Icon: LucideIcon;
  isActive: boolean;
}

function CategoryMenuItem({ countryCode, categoryId, label, Icon, isActive }: CategoryMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="border-l-2 border-transparent data-[active=true]:text-primary data-[active=true]:bg-primary/[0.08] data-[active=true]:font-medium data-[active=true]:border-l-primary data-[active=true]:[&>svg]:text-primary"
      >
        <Link to="/$country/$category" params={{ country: countryCode, category: categoryId }}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
