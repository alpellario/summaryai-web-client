import React, { useEffect, useState } from "react";
import "./Popups.css";
import ScrollingText from "./ScrollingText";
import ExtensionReview from "../../components/ExtensionReview/ExtensionReview";
import { motion } from "framer-motion";

const Popups = () => {
  const [triggerAdd, setTriggerAdd] = useState(false);
  const [extensions, setExtensions] = useState([]);
  const [startGather, setStartGather] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [langSequence, setLangSequence] = useState(false);
  const speed = 10;

  const startLangSequence = () => {
    setLangSequence(true);
  };

  const triggerBounce = () => {
    setBounce(true);
    setTimeout(() => {
      setBounce(false);
      startLangSequence();
    }, 200);
  };

  const extensionsData = [
    // Four corners: Balanced and symmetric
    {
      lan: "ja",
      title:
        "人工知能と機械学習: それらは未来のテクノロジーをどのように形作っているのでしょうか?",
      content:
        "人工知能 (AI) と機械学習 (ML) は技術革新の最前線に立ち、前例のない方法で未来を作り変えます。これらの分野は、タスクを実行するためにコンピューターをプログラミングするだけではありません。データから学習し、適応し、意思決定を行うことができるシステムの作成が含まれます。 AI の応用は、個別化医療や病気の早期発見に使用されるヘルスケアを含むさまざまな分野に及びます。金融分野では、予測分析と不正行為の検出に使用されます。自動車産業では自動運転車に。 AI のサブセットである機械学習を使用すると、明示的なプログラミングを行わずにコンピューターがデータから学習して解釈できるようになり、時間の経過とともに改善されます。",
      top: 165,
      left: 300,
      scale: 0.8,
    },
    {
      lan: "de",
      title:
        "Künstliche Intelligenz und maschinelles Lernen: Wie prägen sie die Technologien der Zukunft?",
      content:
        "Künstliche Intelligenz (KI) und maschinelles Lernen (ML) stehen an der Spitze der technologischen Innovation und gestalten die Zukunft auf beispiellose Weise neu. In diesen Bereichen geht es nicht nur darum, Computer für die Ausführung von Aufgaben zu programmieren; Dabei geht es darum, Systeme zu schaffen, die aus Daten lernen, sich anpassen und Entscheidungen treffen können. Die Anwendung von KI erstreckt sich über verschiedene Sektoren, darunter das Gesundheitswesen, wo sie für personalisierte Medizin und Früherkennung von Krankheiten eingesetzt wird; im Finanzwesen für prädiktive Analysen und Betrugserkennung; und in der Automobilindustrie für selbstfahrende Autos. ",
      top: 165,
      left: 1600,
      scale: 0.8,
    },
    {
      lan: "fr",
      title:
        "Intelligence artificielle et apprentissage automatique : comment façonnent-ils les technologies du futur ?",
      content:
        "L'intelligence artificielle (IA) et l'apprentissage automatique (ML) sont à la pointe de l'innovation technologique, refaçonnant l'avenir de manière sans précédent. Ces domaines ne concernent pas seulement la programmation d’ordinateurs pour effectuer des tâches ; ils impliquent la création de systèmes capables d’apprendre des données, de s’adapter et de prendre des décisions. Les applications de l'IA couvrent divers secteurs, notamment les soins de santé, où elle est utilisée pour la médecine personnalisée et la détection précoce des maladies ; en finance, pour l’analyse prédictive et la détection des fraudes ; et dans l'industrie automobile, pour les voitures autonomes. ",
      top: 895,
      left: 300,
      scale: 0.8,
    },
    {
      lan: "tr",
      title:
        "Yapay Zeka ve Makine Öğrenimi: Geleceğin Teknolojilerini Nasıl Şekillendiriyorlar?",
      content:
        "Yapay Zeka (AI) ve Makine Öğrenimi (ML), teknolojik yeniliklerin ön saflarında yer almakta ve geleceği benzeri görülmemiş şekillerde yeniden şekillendirmektedir. Bu alanlar yalnızca bilgisayarların görevleri yerine getirecek şekilde programlanmasıyla ilgili değildir; verilerden öğrenebilen, uyum sağlayabilen ve karar verebilen sistemler oluşturmayı içerirler. Yapay zekanın uygulaması, kişiselleştirilmiş tıp ve erken hastalık tespiti için kullanıldığı sağlık hizmetleri de dahil olmak üzere çeşitli sektörleri kapsıyor; finansta, tahmine dayalı analiz ve dolandırıcılık tespiti için; ve otomotiv endüstrilerinde, sürücüsüz otomobiller için...",
      top: 895,
      left: 1600,
      scale: 0.8,
    },

    // Inner diamond: Smaller scale, visually engaging
    {
      lan: "pl",
      title:
        "Sztuczna inteligencja i uczenie maszynowe: jak kształtują technologie przyszłości?",
      content:
        "Sztuczna inteligencja (AI) i uczenie maszynowe (ML) przodują w innowacjach technologicznych, zmieniając przyszłość w niespotykany dotychczas sposób. Dziedziny te nie dotyczą tylko programowania komputerów do wykonywania zadań; obejmują tworzenie systemów, które mogą uczyć się na podstawie danych, dostosowywać się i podejmować decyzje. Zastosowanie sztucznej inteligencji obejmuje różne sektory, w tym opiekę zdrowotną, gdzie wykorzystuje się ją w medycynie spersonalizowanej i wczesnym wykrywaniu chorób; w finansach do analizy predykcyjnej i wykrywania oszustw; oraz w przemyśle motoryzacyjnym, dla samochodów autonomicznych. Uczenie maszynowe, podzbiór sztucznej inteligencji, umożliwia komputerom uczenie się i interpretowanie danych bez wyraźnego programowania, co z czasem ulega poprawie.",
      top: 360,
      left: 595,
      scale: 0.7,
    },
    {
      lan: "ko",
      title: "인공 지능과 기계 학습: 미래 기술을 어떻게 형성하고 있습니까?",
      content:
        "인공지능(AI)과 머신러닝(ML)은 기술 혁신의 최전선에 서서 전례 없는 방식으로 미래를 재편하고 있습니다. 이러한 분야는 단순히 작업을 수행하기 위해 컴퓨터를 프로그래밍하는 것에 관한 것이 아닙니다. 여기에는 데이터로부터 학습하고, 적응하고, 의사결정을 내릴 수 있는 시스템을 만드는 것이 포함됩니다. AI의 적용은 의료를 포함한 다양한 분야에 걸쳐 있으며, 맞춤 의학 및 조기 질병 감지에 사용됩니다. 금융 부문에서는 예측 분석 및 사기 탐지를 위해 자동차 산업, 자율주행차 분야에서도 마찬가지입니다. AI의 하위 집합인 머신러닝을 통해 컴퓨터는 명시적인 프로그래밍 없이 데이터를 학습하고 해석할 수 있으며 시간이 지남에 따라 향상됩니다.",
      top: 360,
      left: 1305,
      scale: 0.7,
    },
    {
      lan: "zh",
      title: "人工智能和机器学习：它们如何塑造未来的技术？",
      content:
        "人工智能 (AI) 和机器学习 (ML) 站在技术创新的前沿，以前所未有的方式重塑未来。这些领域不仅仅涉及对计算机进行编程以执行任务；还涉及计算机编程。它们涉及创建能够从数据中学习、适应和做出决策的系统。人工智能的应用涵盖各个领域，包括医疗保健，用于个性化医疗和早期疾病检测；在金融领域，用于预测分析和欺诈检测；在汽车工业中，用于自动驾驶汽车。机器学习是人工智能的一个子集，它使计算机能够在无需显式编程的情况下学习和解释数据，并随着时间的推移而不断改进。",
      top: 700,
      left: 595,
      scale: 0.7,
    },
    {
      lan: "es",
      title:
        "Inteligencia artificial y aprendizaje automático: ¿cómo están dando forma a las tecnologías del futuro?",
      content:
        "La Inteligencia Artificial (IA) y el Aprendizaje Automático (ML) están a la vanguardia de la innovación tecnológica y están remodelando el futuro de maneras sin precedentes. Estos campos no se tratan sólo de programar computadoras para realizar tareas; Implican la creación de sistemas que puedan aprender de los datos, adaptarse y tomar decisiones. La aplicación de la IA abarca varios sectores, incluido el de la salud, donde se utiliza para la medicina personalizada y la detección temprana de enfermedades; en finanzas, para análisis predictivo y detección de fraude; y en la industria automotriz, para vehículos autónomos. El aprendizaje automático, un subconjunto de la IA, permite a las computadoras aprender e interpretar datos sin programación explícita, mejorando con el tiempo.",
      top: 700,
      left: 1305,
      scale: 0.7,
    },
  ];

  const handleGather = () => {
    console.log("Now it can all be gathered in the middle");
    console.log(startGather);

    renderExtensions();
  };

  const generateExtensions = () => {
    const newExtensions = [];

    extensionsData.forEach((extension, i) => {
      const customStyle = {
        position: "absolute",
        top: startGather ? "50% !important" : `${extension.top}px`,
        left: startGather ? "50% !important" : `${extension.left}px`,
        transform: "translate(-50%, -50%)",
      };

      newExtensions.push(
        <div
          className="popups_extension_review"
          style={customStyle}
          key={i}
          id={`extension_review_${i}`}
        >
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: startGather ? 1 : extension.scale }}
            transition={{
              duration: 0.6,
              delay: 0.15 * i,
              type: "spring",
              stiffness: 240,
              damping: 20,
            }}
          >
            <ExtensionReview
              displayMode={true}
              onPage={"text"}
              addData={extensionsData[i]}
              lan={extension.lan}
              handleGather={handleGather}
            />
          </motion.div>
        </div>
      );
    });

    return newExtensions;
  };

  useEffect(() => {
    if (triggerAdd) {
      setExtensions(generateExtensions());
    }
  }, [triggerAdd]);

  const renderExtensions = () => {
    setStartGather(true);
    triggerBounce();
    for (let i = 0; i < 8; i++) {
      const element = document.getElementById(`extension_review_${i}`);
      if (element) {
        element.style.top = "50%";
        element.style.left = "50%";
        element.style.transform = "translate(-50%, -50%)";
        element.style.transition = "all 0.5s ease";
      }
    }
    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        const element = document.getElementById(`extension_review_${i}`);
        if (element) {
          element.style.display = "none";
        }
      }
    }, 500);
  };

  return (
    <div className="popups_background">
      <ScrollingText speed={speed} />
      <div className="popups_container">
        <div className="popups_container_extension_review">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: bounce ? 1.2 : 1 }}
            // transition={{ duration: 0.6, delay: 0.1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <ExtensionReview
              onPage="options"
              handleTrigger={() => setTriggerAdd(true)}
              langSequence={langSequence}
            />
          </motion.div>
        </div>
        {extensions}
      </div>
    </div>
  );
};

export default Popups;
