import { BookOpen, CheckCircle, Shield, Zap, FileText, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Complete Coverage",
    description: "All 21 chapters of the 0417 ICT syllabus. Theory and practical questions aligned with Cambridge standards.",
    color: "indigo",
  },
  {
    icon: FileText,
    title: "Detailed Explanations",
    description: "Learn from your mistakes with comprehensive explanations for every question, helping you understand concepts deeply.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Admin Verified",
    description: "Secure, moderated learning environment. All content is verified by ICT experts to ensure accuracy.",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Progress Tracking",
    description: "Monitor your improvement across chapters with detailed analytics and performance metrics.",
    color: "orange",
  },
  {
    icon: Users,
    title: "Peer Learning",
    description: "Compare your performance and learn collaboratively in a safe, moderated environment.",
    color: "green",
  },
  {
    icon: CheckCircle,
    title: "Exam Simulation",
    description: "Practice with timed quizzes and mock exams that mirror the real 0417 ICT exam format.",
    color: "red",
  },
];

const colorVariants = {
  indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
  blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
  purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
  orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
  green: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",
  red: "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white",
};

export function FeatureGrid() {
  return (
    <section id="features" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Everything you need to{" "}
            <span className="text-indigo-600">succeed</span>
          </h2>
          <p className="text-lg text-slate-600">
            Comprehensive features designed to help you master the 0417 ICT curriculum
            and ace your Cambridge exams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClass = colorVariants[feature.color as keyof typeof colorVariants];
            
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${colorClass} transition-all duration-300 mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">21+</div>
              <div className="text-sm text-slate-600">Complete Chapters</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-sm text-slate-600">Practice Questions</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">100%</div>
              <div className="text-sm text-slate-600">Syllabus Coverage</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-sm text-slate-600">Access Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}