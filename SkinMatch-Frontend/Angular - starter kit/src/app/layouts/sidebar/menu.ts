import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 0,
        label: 'menu',
        isTitle: true,
    },
    {
        id: 1,
        label: 'dashboards',
        icon: 'monitor-dot',
        roles: ['ADMIN', 'USER'],
        subItems: [
            {
                id: 1.1,
                label: 'analytics',
                link: '/',
                parentId: 1,
                roles: ['ADMIN', 'USER']
            }
        ]
    },
    {
        id: 2,
        label: 'apps',
        isTitle: true,
    },
    {
        id: 2.1,
        label: 'products',
        icon: 'shopping-bag',
        link: '/pages/product',
        parentId: 2,
        roles: ['ADMIN', 'USER']
    },
    {
        id: 2.2,
        label: 'add-product',
        icon: 'plus-circle',
        link: '/pages/addproduct',
        parentId: 2,
        roles: ['ADMIN']
    },
    {
        id: 2.3,
        label: 'profile',
        icon: 'user',
        link: '/pages-account',
        parentId: 2,
        roles: ['ADMIN']
    },
    {
        id: 2.4,
        label: 'ecommerce',
        icon: 'shopping-cart',
        parentId: 2,
        roles: ['ADMIN', 'USER'],
        subItems: [
            {
                id: 2.41,
                label: 'products',
                parentId: 2.4,
                roles: ['ADMIN', ],
                subItems: [

                    {
                        id: 2.412,
                        label: 'add-new',
                        link: '/pages/addproduct',
                        parentId: 2.41,
                        roles: ['ADMIN']
                    }
                ]
            },
            {
                id: 2.42,
                label: 'shopping-cart',
                link: '/cart',
                parentId: 2.4,
                roles: ['ADMIN', 'USER']
            },
            {
                id: 2.43,
                label: 'checkout',
                link: '/checkout',
                parentId: 2.4,
                roles: ['ADMIN', 'USER']
            },
            {
                id: 2.44,
                label: 'orders',
                link: '/orders',
                parentId: 2.4,
                roles: ['ADMIN', 'USER']
            }
        ]
    },
    {
        id: 2.5,
        label: 'hr-management',
        icon: 'users',
        parentId: 2,
        roles: ['ADMIN'],
        subItems: [
            {
                id: 2.51,
                label: 'employees-list',
                link: '/employees',
                parentId: 2.5,
                roles: ['ADMIN']
            },
            {
                id: 2.52,
                label: 'holidays',
                link: '/holidays',
                parentId: 2.5,
                roles: ['ADMIN']
            },
            {
                id: 2.53,
                label: 'leaves-manage',
                parentId: 2.5,
                roles: ['ADMIN'],
                subItems: [
                    {
                        id: 2.531,
                        label: 'by-employee',
                        link: '/leaves/employee',
                        parentId: 2.53,
                        roles: ['ADMIN']
                    },
                    {
                        id: 2.532,
                        label: 'add-leave-employee',
                        link: '/leaves/employee/add',
                        parentId: 2.53,
                        roles: ['ADMIN']
                    },
                    {
                        id: 2.533,
                        label: 'by-hr',
                        link: '/leaves/hr',
                        parentId: 2.53,
                        roles: ['ADMIN']
                    }
                ]
            },
            {
                id: 2.54,
                label: 'attendance',
                parentId: 2.5,
                roles: ['ADMIN'],
                subItems: [
                    {
                        id: 2.541,
                        label: 'attendance-hr',
                        link: '/attendance/hr',
                        parentId: 2.54,
                        roles: ['ADMIN']
                    },
                    {
                        id: 2.542,
                        label: 'main-attendance',
                        link: '/attendance/main',
                        parentId: 2.54,
                        roles: ['ADMIN']
                    }
                ]
            },
            {
                id: 2.55,
                label: 'department',
                link: '/departments',
                parentId: 2.5,
                roles: ['ADMIN']
            },
            {
                id: 2.56,
                label: 'payroll',
                parentId: 2.5,
                roles: ['ADMIN'],
                subItems: [
                    {
                        id: 2.561,
                        label: 'employee-salary',
                        link: '/payroll/salary',
                        parentId: 2.56,
                        roles: ['ADMIN']
                    },
                    {
                        id: 2.562,
                        label: 'payslip',
                        link: '/payroll/payslip',
                        parentId: 2.56,
                        roles: ['ADMIN']
                    },
                    {
                        id: 2.563,
                        label: 'create-payslip',
                        link: '/payroll/create',
                        parentId: 2.56,
                        roles: ['ADMIN']
                    }
                ]
            }
        ]
    },
    {
        id: 2.6,
        label: 'notes',
        icon: 'file-text',
        link: '/notes',
        parentId: 2,
        roles: ['ADMIN']
    },
    {
        id: 2.7,
        label: 'invoices',
        icon: 'file',
        parentId: 2,
        roles: ['ADMIN'],
        subItems: [
            {
                id: 2.71,
                label: 'list-view',
                link: '/invoices',
                parentId: 2.7,
                roles: ['ADMIN']
            },
            {
                id: 2.72,
                label: 'add-new',
                link: '/invoices/add',
                parentId: 2.7,
                roles: ['ADMIN']
            },
            {
                id: 2.73,
                label: 'overview',
                link: '/invoices/overview',
                parentId: 2.7,
                roles: ['ADMIN']
            }
        ]
    },
];
