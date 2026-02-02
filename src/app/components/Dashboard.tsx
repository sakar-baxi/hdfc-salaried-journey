"use client";

import React from "react";
import { useJourney } from "@/app/context/JourneyContext";
import {
    Home,
    Users,
    Globe,
    Activity,
    Settings,
    Search,
    Download,
    Filter,
    RefreshCcw,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
    const { startJourney } = useJourney();

    const employees = [
        { id: "0013", name: "Sampurna", phone: "9934090013", email: "sachin.bansal72@gmail.com", journey: "ntb", dob: "1990-05-15", pan: "ABCDE1234F", fatherName: "S. K. Bansal", motherName: "Anita Bansal", currentAddress: "123, Green Park, Delhi", income: "1250000" },
        { id: "0019", name: "Pushp Jain Updated", phone: "9934090019", email: "suraj_saxena64@gmail.com", journey: "etb-nk", dob: "1985-11-20", pan: "FPKRS9876Q", fatherName: "K. L. Jain", motherName: "Suman Jain", currentAddress: "45, Sector 15, Gurgaon", income: "1800000" },
        { id: "0096", name: "lovish Sethi", phone: "8859512839", email: "lovish@tartanhq.com", journey: "etb", dob: "1993-01-10", pan: "EXSIT1234P", fatherName: "M. R. Sethi", motherName: "Rekha Sethi", currentAddress: "Shop No 4, Main Market, Noida", income: "900000" },
        { id: "0097", name: "Lovish", phone: "8859512839", email: "lovishsethi1220@gmail.com", journey: "ntb", dob: "1994-08-25", pan: "BRTYU9988X", fatherName: "R. P. Sethi", motherName: "Sunita Sethi", currentAddress: "House 88, Sector 2, Faridabad", income: "1100000" },
        { id: "0098", name: "new test user", phone: "8859512839", email: "newtestuser@gmail.com", journey: "ntb", dob: "1988-12-12", pan: "GHFRS0000Z", fatherName: "N. Dev", motherName: "Maya Dev", currentAddress: "Flat 202, Skyline Tower, Mumbai", income: "1500000" },
        { id: "0099", name: "test user test", phone: "", email: "testuser12@gmail.com", journey: "ntb", dob: "1999-01-01", pan: "TSTUS1111A", fatherName: "P. Kumar", motherName: "Lata Kumar", currentAddress: "Villa 10, Palm Grove, Bangalore", income: "850000" },
    ];

    return (
        <div className="flex h-screen w-full bg-[#f8f9fa] text-[#0f172a] font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-20 bg-white border-r border-[#e2e8f0] flex flex-col items-center py-6 flex-shrink-0">
                <div className="text-[10px] font-semibold text-[#94a3b8] mb-3 tracking-wider">MAIN</div>
                <div className="space-y-4">
                    <NavItem icon={Home} active />
                    <NavItem icon={Users} />
                    <NavItem icon={Globe} />
                    <NavItem icon={Activity} />
                </div>
                <div className="w-10 h-px bg-[#e2e8f0] my-4" />
                <div className="text-[10px] font-semibold text-[#94a3b8] mb-3 tracking-wider">SETTINGS</div>
                <NavItem icon={Settings} />
                <div className="mt-auto w-9 h-9 bg-[#06b6d4] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    B
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto px-8 py-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-3 text-sm text-[#94a3b8] mb-6">
                    <Home className="w-4.5 h-4.5" />
                    <span className="text-[#cbd5e1]">/</span>
                    <span>Active Connections</span>
                    <span className="text-[#cbd5e1]">/</span>
                    <span className="text-[#3b82f6] cursor-pointer">Chola Business Services L...</span>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-[#e2e8f0] mb-6">
                    <TabItem label="Employee Directory" count={254} />
                    <TabItem label="Account Opening Status" active />
                    <TabItem label="Updates" count={177} />
                    <TabItem label="Diagnostics" />
                </div>

                {/* Toolbar */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center bg-white border border-[#e2e8f0] rounded-md px-3 h-10 w-80 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <Search className="w-4.5 h-4.5 text-[#94a3b8]" />
                        <input type="text" placeholder="Search" className="ml-2 text-sm outline-none w-full" />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-xs text-[#3b82f6] text-right leading-tight font-medium">
                            Automated email<br />to employees
                        </div>
                        <div className="w-9 h-5 bg-[#e2e8f0] rounded-full relative cursor-pointer group">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm transition-transform group-hover:scale-105" />
                        </div>
                        <button className="h-10 px-4 border border-[#e2e8f0] bg-white text-[#3b82f6] font-medium text-sm rounded-md hover:bg-slate-50 transition-colors">
                            Refresh all
                        </button>
                        <button className="h-10 px-4 bg-[#3b82f6] text-white font-medium text-sm rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm shadow-blue-200">
                            <Download className="w-4.5 h-4.5" />
                            Download CSV
                        </button>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead className="bg-[#fcfdfe]">
                                <tr className="border-b border-[#e2e8f0]">
                                    <HeaderCell label="Employee ID" />
                                    <HeaderCell label="Employee name" />
                                    <HeaderCell label="Phone number" />
                                    <HeaderCell label="Official Email ID" />
                                    <HeaderCell label="Bank Account Status" hasFilter />
                                    <HeaderCell label="Reference ID" />
                                    <th className="px-5 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2e8f0]">
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-5 py-4 text-[#0f172a] font-medium">{emp.id}</td>
                                        <td className="px-5 py-4 text-[#0f172a] font-semibold">{emp.name}</td>
                                        <td className="px-5 py-4 text-[#64748b]">{emp.phone}</td>
                                        <td className="px-5 py-4 text-[#64748b]">{emp.email}</td>
                                        <td className="px-5 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                                Not Started
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-[#94a3b8]">—</td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-4">
                                                <span className="text-[#3b82f6] font-medium text-xs cursor-pointer hover:underline">Refresh now</span>
                                                <button
                                                    onClick={() => startJourney(emp.journey as any, {
                                                        mobileNumber: emp.phone,
                                                        name: emp.name,
                                                        email: emp.email,
                                                        dob: (emp as any).dob,
                                                        pan: (emp as any).pan,
                                                        fatherName: (emp as any).fatherName,
                                                        motherName: (emp as any).motherName,
                                                        currentAddress: (emp as any).currentAddress,
                                                        income: (emp as any).income
                                                    })}
                                                    className="h-8 px-4 border border-[#e2e8f0] rounded bg-white text-xs font-bold text-[#0f172a] hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all"
                                                >
                                                    Invite
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 border-t border-[#e2e8f0] bg-[#fcfdfe] flex justify-between items-center mt-auto">
                        <div className="flex gap-3">
                            <button disabled className="px-4 py-2 border border-[#e2e8f0] rounded-md text-sm text-[#94a3b8] cursor-not-allowed">Previous</button>
                            <button className="px-4 py-2 border border-[#e2e8f0] bg-white rounded-md text-sm text-[#0f172a] hover:bg-slate-50">Next</button>
                        </div>
                        <div className="text-sm text-[#64748b]">Page 1 of 10</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NavItem({ icon: Icon, active }: { icon: any; active?: boolean }) {
    return (
        <div className={cn(
            "w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all",
            active ? "bg-[#eef2ff] text-[#3b82f6]" : "text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#0f172a]"
        )}>
            <Icon className="w-5 h-5" />
        </div>
    );
}

function TabItem({ label, count, active }: { label: string; count?: number; active?: boolean }) {
    return (
        <div className={cn(
            "pb-3 text-sm font-semibold cursor-pointer relative flex items-center gap-2 transition-colors",
            active ? "text-[#3b82f6] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-[#3b82f6]" : "text-[#64748b] hover:text-[#0f172a]"
        )}>
            {label}
            {count !== undefined && (
                <span className="bg-[#f1f5f9] text-[#64748b] px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {count}
                </span>
            )}
        </div>
    );
}

function HeaderCell({ label, hasFilter }: { label: string; hasFilter?: boolean }) {
    return (
        <th className="px-5 py-4 text-left font-bold text-[#0f172a] whitespace-nowrap">
            <div className="flex items-center gap-2">
                {label}
                {hasFilter && <Filter className="w-3.5 h-3.5" />}
            </div>
        </th>
    );
}
