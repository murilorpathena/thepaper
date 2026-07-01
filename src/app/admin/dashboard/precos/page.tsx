"use client";

import { useState } from "react";
import { AD_FORMATS, type AdFormat } from "@/types/advertiser";
import { formatPriceCents } from "@/lib/stripe/client";

export default function AdminPrecosPage() {
  const [formats] = useState<AdFormat[]>(AD_FORMATS);

  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Preços dos Anúncios
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Configure os valores de cada formato de anúncio
      </p>

      <div className="mt-6 space-y-3">
        {formats.map((fmt) => (
          <div
            key={fmt.id}
            className="flex items-center justify-between rounded-xl border border-paper-200 bg-white p-4 dark:border-paper-800 dark:bg-paper-900"
          >
            <div>
              <p className="font-medium text-paper-900 dark:text-paper-50">
                {fmt.name}
              </p>
              <p className="text-xs text-paper-400">{fmt.description}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-accent-600">
                {formatPriceCents(fmt.priceCents)}
              </p>
              <span
                className={`text-xs ${
                  fmt.available ? "text-accent-600" : "text-red-500"
                }`}
              >
                {fmt.available ? "Ativo" : "Indisponível"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
