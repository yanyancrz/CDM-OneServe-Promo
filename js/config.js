/* ==========================================================================
   CDM OneServe — Centralized Website Configuration
   --------------------------------------------------------------------------
   This is the SINGLE source of truth for all changeable website settings.
   Update the values below to change the application URL, service links,
   contact information, and other configurable content — no need to edit the
   HTML or CSS when these values change.

   Placeholder values are clearly marked. Replace them with real,
   officially-approved information when available.
   ========================================================================== */

window.ONESERVE_CONFIG = {

  /* ---- Core application URL -------------------------------------------
     The real, live promotional entry point to the OneServe application.
     All "Open OneServe" buttons and installation steps point here.
     Confirmed from the existing project configuration.                   */
  app: {
    url: "https://portal.cdmconnect.online/",
    name: "CDM OneServe"
  },

  /* ---- Administrative entry point ---------------------------------------
     NOTE: Keep this private/undisclosed unless a public admin URL is
     officially approved. Leave as null to avoid publishing internal URLs. */
  admin: {
    url: null,            // e.g. "https://admin.cdmconnect.online/" if publicly appropriate
    // For now we only describe the admin entry point in words, not with a live link.
  },

  /* ---- Institution / branding ------------------------------------------ */
  institution: {
    name: "Colegio de Montalban",
    short: "CDM",
    location: "Rodriguez, Rizal"
  },

  /* ---- Campus services --------------------------------------------------
     Each service is introduced here. `url` will normally point to the
     OneServe application, where the service lives. Set `status` to
     "available", "beta", or "coming-soon" to control its badge.
     Set `url` to null to render the service as "Available in OneServe"
     without a fabricated external link.                                    */
  services: [
    {
      id: "lost-and-found",
      name: "Lost & Found",
      description: "Report lost belongings, browse found items, and follow supported recovery or claiming processes.",
      icon: "package-search",
      url: "https://portal.cdmconnect.online/",   // opens OneServe; set null to disable link
      status: "available"
    },
    {
      id: "library",
      name: "Library",
      description: "Explore library resources and access available digital library features.",
      icon: "book",
      url: "https://portal.cdmconnect.online/",
      status: "available"
    },
    {
      id: "clinic",
      name: "Clinic",
      description: "Discover clinic information and access supported health-service workflows.",
      icon: "activity",
      url: "https://portal.cdmconnect.online/",
      status: "available"
    },
    {
      id: "guidance",
      name: "Guidance",
      description: "Find guidance-related information and access supported counseling services.",
      icon: "heart-handshake",
      url: "https://portal.cdmconnect.online/",
      status: "available"
    },
    {
      id: "marketplace",
      name: "Marketplace",
      description: "Discover student businesses and offerings through the campus marketplace.",
      icon: "store",
      url: "https://portal.cdmconnect.online/",
      status: "available"
    }
  ],

  /* ---- Official contact information -------------------------------------
     Replace placeholders with officially-approved details when available.
     Do NOT invent emails, phone numbers, or policies.                     */
  contact: {
    email: null,                       // e.g. "oneserve@cdm.edu.ph"
    phone: null,                      // e.g. "+63 2 8000 0000"
    office: "Colegio de Montalban — Kasiglahan Village, Rodriguez, Rizal",
    supportNote: "For account or access issues, please contact the CDM OneServe administrator through your campus channels."
  },

  /* ---- Social media links -----------------------------------------------
     Leave entries as null until official, verified accounts are confirmed.
     Only non-null links are rendered in the footer.                        */
  social: {
    facebook: null,
    twitter: null,
    instagram: null,
    youtube: null
  },

  /* ---- Miscellaneous ---------------------------------------------------- */
  misc: {
    copyrightStartYear: 2026,          // renders as "© 2026–<currentYear>"
    announcement: null                 // optional banner text, e.g. "Library service is now live in OneServe!"
  }
};
