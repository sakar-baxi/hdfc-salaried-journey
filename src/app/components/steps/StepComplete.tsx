"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CreditCard, Landmark, ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const OFFERS = {
  cards: [
    {
      id: "regalia",
      name: "Regalia Gold",
      type: "Premium Travel",
      limit: "₹8,00,000",
      image: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/2d8f921d-9104-44bf-a55e-49b04f7a637d?",
      color: "from-slate-900 to-slate-700",
      benefits: ["Milestone rewards", "Airport lounge access", "Insurance cover"]
    },
    {
      id: "millennia",
      name: "Millennia Card",
      type: "Lifestyle & Cashback",
      limit: "₹3,50,000",
      image: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/f38d3885-300e-436f-b25c-0b31e97669d0?",
      color: "from-blue-600 to-indigo-600",
      benefits: ["5% cashback on Amazon/Flipkart", "Dineout benefits", "Fuel surcharge waiver"]
    }
  ],
  loans: [
    {
      id: "pl",
      name: "Personal Loan",
      amount: "₹15,00,000",
      rate: "10.5% p.a.",
      icon: Landmark,
      color: "text-emerald-600 bg-emerald-50",
      tag: "Instant Disbursal"
    },
    {
      id: "car",
      name: "Car Loan",
      amount: "₹10,00,000",
      rate: "8.75% p.a.",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50",
      tag: "No Processing Fee"
    }
  ]
};

export default function StepComplete() {
  const { userType, resetJourney } = useJourney();
  const [showOffers, setShowOffers] = useState(false);

  useEffect(() => {
    trackEvent('page_viewed', { page: 'complete' });
  }, []);

  const handleContinueToOffers = () => {
    trackEvent('viewed_preapproved_offers');
    setShowOffers(true);
  };

  if (showOffers) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-4 h-4" /> Exclusive for You
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Your Premium Offers</h2>
          <p className="text-xl text-slate-500 font-medium">Based on your new Salary Account, we've pre-approved these benefits.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Credit Cards Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="p-2 bg-primary/10 rounded-lg"><CreditCard className="w-6 h-6 text-primary" /></div>
              <h3 className="text-2xl font-bold text-slate-800">Pre-approved Cards</h3>
            </div>

            <div className="space-y-4">
              {OFFERS.cards.map((card) => (
                <Card key={card.id} className="overflow-hidden border-none shadow-premium hover:shadow-premium-lg transition-all group cursor-pointer bg-white/80 backdrop-blur-sm">
                  <div className={cn("h-32 bg-gradient-to-r p-6 relative flex items-center justify-between", card.color)}>
                    <div className="space-y-1 z-10">
                      <h4 className="text-xl font-bold text-white">{card.name}</h4>
                      <p className="text-white/70 text-sm font-medium">{card.type}</p>
                    </div>
                    <img src={card.image} alt={card.name} className="h-28 object-contain drop-shadow-2xl translate-x-4 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">PRE-APPROVED</div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Credit Limit</span>
                      <span className="text-primary font-black text-xl">{card.limit}</span>
                    </div>
                    <ul className="space-y-2">
                      {card.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Loans Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="p-2 bg-primary/10 rounded-lg"><Landmark className="w-6 h-6 text-primary" /></div>
              <h3 className="text-2xl font-bold text-slate-800">Instant Loans</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {OFFERS.loans.map((loan) => (
                <Card key={loan.id} className="p-8 border-none shadow-premium hover:shadow-premium-lg transition-all bg-white/80 backdrop-blur-sm relative overflow-hidden group">
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="space-y-4">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", loan.color)}>
                        <loan.icon className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-2xl font-black text-slate-800">{loan.amount}</h4>
                        <p className="text-slate-500 font-bold text-sm">{loan.name} @ {loan.rate}</p>
                      </div>
                      <div className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
                        {loan.tag}
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-full border-primary/20 text-primary font-bold hover:bg-primary hover:text-white group-hover:scale-105 transition-all">
                      Apply Now
                    </Button>
                  </div>
                  {/* Decorative background circle */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full group-hover:scale-110 transition-transform duration-700" />
                </Card>
              ))}
            </div>

            <div className="bg-[#002D72]/5 p-8 rounded-[32px] border border-primary/10 flex items-center justify-between group cursor-pointer hover:bg-[#002D72]/10 transition-all shadow-sm">
              <div className="space-y-2">
                <h4 className="text-xl font-black text-primary">Insurance & Wealth</h4>
                <p className="text-sm text-slate-600 font-medium">Get 100% cover on your new Salary Account.</p>
              </div>
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-lg shadow-primary/20">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-center pt-8">
          <Button
            variant="ghost"
            onClick={resetJourney}
            className="text-slate-500 font-bold hover:text-primary transition-all"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center py-10">
      <Card className="w-full max-w-2xl border-none shadow-premium-lg bg-white/80 backdrop-blur-xl rounded-[40px] overflow-hidden flex flex-col p-2 text-center">
        <div className="p-12 space-y-10">
          <div className="mx-auto w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center shadow-inner relative">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 relative z-10" />
            <div className="absolute inset-0 bg-emerald-200 blur-2xl opacity-40 rounded-full animate-pulse" />
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Account Successfully Created!</h2>
            <p className="text-lg text-slate-500 font-semibold uppercase tracking-widest">Welcome to the family, Chirag!</p>
          </div>

          <div className="p-10 bg-gradient-to-br from-[#0047CC] to-[#002D72] rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Saving Salary Account</p>
                <p className="text-3xl font-black tracking-[0.2em]">1234-5678-9012</p>
              </div>

              <div className="flex justify-between items-end border-t border-white/20 pt-6">
                <div className="text-left">
                  <p className="text-white/60 text-[10px] font-bold uppercase">Customer ID</p>
                  <p className="font-bold text-lg">778899001</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-[10px] font-bold uppercase">Branch Name</p>
                  <p className="font-bold text-lg">S S PLAZA</p>
                </div>
              </div>
            </div>

            {/* Bank Logo Overlay */}
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse" />
          </div>

          <Button
            variant="primary-cta"
            className="w-full h-18 text-2xl font-black rounded-full shadow-2xl shadow-primary/30 py-8 gap-4 active:scale-[0.98] transition-all hover:scale-[1.02]"
            onClick={handleContinueToOffers}
          >
            Check My Offers <ArrowRight className="w-8 h-8 stroke-[3px]" />
          </Button>
        </div>

        <div className="bg-slate-50 p-6">
          <p className="text-xs text-slate-400 font-medium">Digital welcome kit has been sent to your registered email address.</p>
        </div>
      </Card>
    </div>
  );
}
