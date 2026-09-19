export function DashboardSkeleton() {
  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#080812] animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="h-7 w-56 rounded-xl bg-[#1a1a2e] mb-3" />
        <div className="h-4 w-40 rounded-lg bg-[#1a1a2e]" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5"
          >
            <div className="h-3 w-32 rounded-lg bg-[#1a1a2e] mb-4" />
            <div className="h-10 w-20 rounded-xl bg-[#1a1a2e] mb-3" />
            <div className="h-5 w-24 rounded-full bg-[#1a1a2e]" />
          </div>
        ))}
      </div>

      {/* Chart + Recent */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-6">
        <div className="xl:col-span-3 bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-6">
          <div className="h-4 w-36 rounded-lg bg-[#1a1a2e] mb-2" />
          <div className="h-3 w-48 rounded-lg bg-[#1a1a2e] mb-6" />
          <div className="flex items-end gap-2 h-48 px-2">
            {[60, 90, 40, 75, 55, 80, 35].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-lg bg-[#1a1a2e]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="xl:col-span-2 bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-6">
          <div className="h-4 w-32 rounded-lg bg-[#1a1a2e] mb-2" />
          <div className="h-3 w-40 rounded-lg bg-[#1a1a2e] mb-5" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] shrink-0" />
              <div className="flex-1">
                <div className="h-3 w-full rounded-lg bg-[#1a1a2e] mb-1.5" />
                <div className="h-2 w-16 rounded-lg bg-[#1a1a2e]" />
              </div>
              <div className="w-14 h-5 rounded-lg bg-[#1a1a2e]" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] mb-4" />
            <div className="h-4 w-36 rounded-lg bg-[#1a1a2e] mb-2" />
            <div className="h-3 w-28 rounded-lg bg-[#1a1a2e]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyzeSkeleton() {
  return (
    <div className="flex h-screen bg-[#080812] overflow-hidden animate-pulse">
      <div className="flex flex-col flex-1 border-r border-[#1e1e35]">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e35] bg-[#0a0a18]">
          <div className="flex-1 h-9 rounded-lg bg-[#1a1a2e]" />
          <div className="w-24 h-9 rounded-lg bg-[#1a1a2e]" />
          <div className="w-24 h-9 rounded-lg bg-[#1a1a2e]" />
          <div className="w-20 h-9 rounded-lg bg-[#1a1a2e]" />
        </div>
        <div className="flex-1 bg-[#080812]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-1.5">
              <div className="w-6 h-3 rounded bg-[#1a1a2e]" />
              <div
                className="h-3 rounded bg-[#1a1a2e]"
                style={{ width: `${30 + Math.random() * 50}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 px-4 py-3 border-t border-[#1e1e35] bg-[#0a0a18]">
          <div className="flex-1 h-3 rounded-lg bg-[#1a1a2e]" />
          <div className="w-28 h-9 rounded-xl bg-[#1a1a2e]" />
        </div>
      </div>
      <div className="w-80 bg-[#0a0a18] flex flex-col items-center justify-center gap-4 p-6">
        <div className="w-12 h-12 rounded-2xl bg-[#1a1a2e]" />
        <div className="h-4 w-32 rounded-lg bg-[#1a1a2e]" />
        <div className="h-3 w-48 rounded-lg bg-[#1a1a2e]" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#080812] animate-pulse">
      <div className="mb-6">
        <div className="h-7 w-48 rounded-xl bg-[#1a1a2e] mb-2" />
        <div className="h-4 w-64 rounded-lg bg-[#1a1a2e]" />
      </div>
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-7 w-16 rounded-full bg-[#1a1a2e]" />
        ))}
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-5 mb-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1a1a2e] shrink-0" />
            <div className="flex-1">
              <div className="h-4 w-48 rounded-lg bg-[#1a1a2e] mb-2" />
              <div className="h-3 w-32 rounded-lg bg-[#1a1a2e]" />
            </div>
            <div className="w-10 h-8 rounded-lg bg-[#1a1a2e]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function VisualizerSkeleton() {
  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#080812] animate-pulse">
      <div className="mb-6">
        <div className="h-7 w-56 rounded-xl bg-[#1a1a2e] mb-2" />
        <div className="h-4 w-48 rounded-lg bg-[#1a1a2e]" />
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-64 flex flex-col gap-4">
          <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
            <div className="h-3 w-24 rounded-lg bg-[#1a1a2e] mb-4" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 rounded-xl bg-[#1a1a2e] mb-2" />
            ))}
          </div>
          <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl p-4">
            <div className="h-3 w-20 rounded-lg bg-[#1a1a2e] mb-4" />
            <div className="flex gap-2">
              <div className="flex-1 h-16 rounded-xl bg-[#1a1a2e]" />
              <div className="flex-1 h-16 rounded-xl bg-[#1a1a2e]" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1e1e35] flex justify-between">
              <div>
                <div className="h-4 w-32 rounded-lg bg-[#1a1a2e] mb-2" />
                <div className="h-3 w-48 rounded-lg bg-[#1a1a2e]" />
              </div>
              <div className="h-7 w-16 rounded-lg bg-[#1a1a2e]" />
            </div>
            <div className="flex items-end justify-center gap-2 px-6 py-8">
              {[60, 90, 40, 75, 55, 80, 35].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg bg-[#1a1a2e]"
                  style={{ height: h * 1.5 }}
                />
              ))}
            </div>
          </div>
          <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl px-5 py-4">
            <div className="h-1.5 w-full rounded-full bg-[#1a1a2e]" />
          </div>
          <div className="bg-[#0f0f20] border border-[#1e1e35] rounded-2xl px-5 py-4 flex justify-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-20 rounded-xl bg-[#1a1a2e]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
