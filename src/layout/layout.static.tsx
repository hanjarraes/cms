export interface IDropdownItem {
    icon: string;
    title: string;
    link: string;
    description: string;
}


export const dropdownBankSoal: IDropdownItem[] = [
    {
        icon: "ri-book-open-line",
        title: "Bank Soal",
        link: "/bank-soal",
        description: "Manage and organize a collection of exam questions",
    },
    {
        icon: "ri-book-open-line",
        title: "Template Soal",
        link: "/template",
        description: "View all available courses in the system",
    },
    {
        icon: "ri-questionnaire-line",
        title: "Quiz",
        link: "/quiz",
        description: "Create and manage schedules for participant assessment",
    },
];

export const dropdownSetting: IDropdownItem[] = [
    {
        icon: "ri-user-line",
        title: "Partisipan",
        link: "/partisipan",
        description: "Manage participant profiles and academic records",
    },
    {
        icon: "ri-user-shared-line",
        title: "Partisipan Grouping",
        link: "/partisipan-group",
        description: "Group participants based on criteria or classes",
    },
    {
        icon: "ri-user-settings-line",
        title: "Staff",
        link: "/staff",
        description: "Manage staff members and their roles",
    },
];