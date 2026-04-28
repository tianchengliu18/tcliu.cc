interface Props {
  titleEn: string;
  titleZh: string;
  isZh: boolean;
}

export default function MaintenancePage({ titleEn, titleZh, isZh }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h1 className="text-[2rem] font-semibold text-text-primary mb-4">
        {isZh ? titleZh : titleEn}
      </h1>
      <p className="text-base text-text-tertiary">
        {isZh ? "页面维护中，稍后回来。" : "Page under maintenance. Check back soon."}
      </p>
    </div>
  );
}
