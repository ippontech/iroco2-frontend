import { Availability } from "~/type/Availability";
import type { ServiceCatalog } from "~/type/ServiceCatalog";

export const catalogResponse: ServiceCatalog[] = [
  {
    id: "a7a944e8-7a55-419e-99d3-4518f7222c1f",
    name: "Amazon Aurora",
    description:
      "La base de données relationnelle Amazon Aurora MySQL Compatible est conçue pour le cloud et combine les performances et la disponibilité des bases de données traditionnelles à la simplicité et à la rentabilité des bases de données open source.",
    shortname: "Aurora",
    availability: Availability.AVAILABLE,
    levers: [
      "Right Sizing pour choisir le type d'instance adapté à votre besoin",
      "Définir des policy de gestion des backup",
      "Auto-scaling des Read replicas",
    ],
    limitations: [
      "Aurora Serverless ne prend en compte que le stockage pour le moment (et pas les ACUs)",
    ],
  },
  {
    id: "80a1bc13-51b9-4d76-bb41-22fd955f3d7c",
    name: "Amazon Elastic Block Store (EBS)",
    description:
      "Amazon Elastic Block Storage (EBS) vous permet de créer des volumes de stockage persistant en mode bloc, puis de les attacher à des instances Amazon EC2.",
    shortname: "EBS",
    availability: Availability.AVAILABLE,
    levers: [
      "Mise en place d'une policy d'archivage des données vers d'autre stockages ou de suppression",
    ],
    limitations: [
      "Il n'y a pas de différenciation entre les types de stockage (SSD, HDD, etc...)",
    ],
  },
  {
    id: "64bfca71-c7f4-4e93-aadc-ebc522ce121f",
    name: "Amazon Relational Database Service (RDS)",
    description:
      "Amazon Relational Database Service (Amazon RDS) Custom est un service de base de données géré pour les applications héritées, personnalisées et intégrées qui nécessitent un accès au système d'exploitation sous-jacent et à l'environnement de base de données.",
    shortname: "RDS",
    availability: Availability.AVAILABLE,
    levers: [
      "Pour les environnements de dev uniquement : Utilisation de SSM pour auto-shutdown/start les instances en dehors des horaires de travail",
      "Mise en place de policy de suppression de backup",
    ],
    limitations: [
      "Impossible de configurer la réplication multi-azs pour les cluster RDS (une seule instance prise en compte)",
    ],
  },
  {
    id: "f01997e6-2a86-456c-a67e-4671b7cccc8f",
    name: "Amazon Elastic File System (EFS)",
    description:
      "Amazon Elastic File System (EFS) fournit un système de fichiers élastique sans serveur simple qui demande très peu de suivi une fois configuré. Il s'utilise avec les solutions AWS Cloud Services et les ressources sur site.",
    shortname: "EFS",
    availability: Availability.AVAILABLE,
    levers: [
      "Mise en place d'une policy d'archivage des données vers d'autre Tier (Infrequent Access, etc...)",
    ],
    limitations: [
      "Le transfert de données (inbound/outbound) n'est pas pris en compte pour le moment",
    ],
  },
  {
    id: "7e1930c6-ca46-4713-bd02-c8228f1f8586",
    name: "Amazon Redshift",
    description:
      "Amazon Redshift est un service d'entreposage de données dans le cloud entièrement géré et d'une capacité de plusieurs pétaoctets. Amazon Redshift étend également les requêtes d'entrepôt de données à votre lac de données, sans chargement requis. Vous pouvez exécuter des requêtes analytiques sur des pétaoctets de données stockées localement dans Redshift, et directement sur des exaoctets de données stockées dans Amazon S3.",
    shortname: "Redshift",
    availability: Availability.AVAILABLE,
    levers: [
      "Utilisation d'Auto scaling pour la provisioned capacity",
      "Right Sizing pour choisir le type d'instance adapté à votre besoin",
    ],
    limitations: [
      "Le transfert de données (inbound/outbound) n'est pas pris en compte pour le moment",
      "Redshift Serverless n'est pas pris en compte pour le moment",
    ],
  },
  {
    id: "e16af23a-dece-4135-9333-c3dfce5fc8dc",
    name: "Amazon Simple Storage Service (S3)",
    description:
      "Amazon Simple Storage Service (Amazon S3) est une solution de stockage sur Internet. Elle permet de stocker et récupérer n'importe quel volume de données à tout moment et depuis n'importe où sur le Web.",
    shortname: "S3",
    availability: Availability.AVAILABLE,
    levers: [
      "Mise en place d'une policy d'archivage des données vers d'autre Tier S3 (Glacier, etc...)",
    ],
    limitations: [
      "Seulement S3 Standard est pris en compte pour le moment",
      "Le transfert de données (inbound/outbound) n'est pas pris en compte pour le moment",
    ],
  },
  {
    id: "512a5e2c-1130-441b-88c9-b0fe8e3dccd8",
    name: "Amazon DynamoDB",
    description:
      "Amazon DynamoDB est une base de données de valeurs-clés et de documents qui offre des performances de l'ordre de la milliseconde, quelle que soit sa taille. Il s'agit d'une base de données durable, multi-région, multimaître, entièrement gérée, avec sécurité, sauvegarde et restauration intégrées, et mise en cache en mémoire pour les applications Internet.",
    shortname: "DynamoDB",
    availability: Availability.AVAILABLE,
    levers: [
      "Utilisation d'Auto scaling pour la provisioned capacity",
      "Choisir la bonne classe de stockage (standard, infrequent, etc...)",
    ],
    limitations: [
      "Le transfert de données (inbound/outbound) n'est pas pris en compte pour le moment",
      "Seulement DynamoDB On-Demand est pris en charge pour le moment",
    ],
  },
  {
    id: "b46fb976-ae0f-47e1-8978-993bf6fb1afd",
    name: "Amazon Elastic Compute Cloud (EC2)",
    description:
      "Amazon Elastic Compute Cloud ou EC2 est un service proposé par Amazon permettant à des tiers de louer des serveurs sur lesquels exécuter leurs propres applications web.",
    shortname: "EC2",
    availability: Availability.AVAILABLE,
    levers: [
      "Utilisation de EC2 Right Sizing pour choisir le type d'instance adapté à votre besoin",
      "Utilisation Amazon EC2 Scheduler pour le démarrage/arrêt des instances non critiques",
      "Utilisation de EC2 Auto-scaling group pour provisionner le bon nombre d'instance selon le besoin",
      "Est ce que EC2 est vraiment le service qu'il vous faut ?",
    ],
    limitations: [
      "Ne prend pas en compte le stockage (EBS ou Instance Store)",
      "Pas de différentiation entre Graviton 1/2/3/4",
      "Le TDP provient du dernier modèle de l'architecture concernée (x86,arm,epyx)",
      "Le mode de consommation SPOT n'est pas pris en compte pour le moment",
    ],
  },
  {
    id: "2e9c3b1b-13fc-4984-8139-93af07ad74df",
    name: "Amazon SageMaker",
    description:
      "Avec Amazon SageMaker, vous ne payez que ce que vous utilisez. La création, la formation et le déploiement de modèles de ML sont facturés à la seconde, sans frais minimum et sans engagement initial. La tarification dans Amazon SageMaker est ventilée par instances ML à la demande, stockage ML et frais de traitement des données dans les instances d'hébergement.",
    shortname: "SageMaker",
    availability: Availability.AVAILABLE,
    levers: [
      "Right Sizing pour choisir le type d'instance adapté à votre besoin",
    ],
    limitations: [
      "Seulement le service SageMaker Notebooks est pris en compte pour le moment",
      "Pas de stockage pris en compte",
    ],
  },
  {
    id: "5a7b23b0-d3d8-4ee5-a7e1-91100e6935f1",
    name: "AWS Fargate",
    description:
      "AWS Fargate est un moteur de calcul sans serveur pour conteneurs qui fonctionne à la fois avec Amazon Elastic Container Service (ECS) et Amazon Elastic Kubernetes Service (EKS). Fargate vous permet de vous concentrer facilement sur la création de vos applications. Il élimine le besoin de mettre en service et de gérer des serveurs, vous permet de spécifier et de payer les ressources par application, et améliore la sécurité grâce à l'isolation des applications par leur conception.",
    shortname: "Fargate",
    availability: Availability.AVAILABLE,
    levers: [
      "Right-sizing des tâches Fargate (monitoring Cloudwatch)",
      "Planification des tâches dans les périodes d'utilisation",
      "ECS Fargate Autoscaling pour provisionner le bon nombre de tâche selon le besoin",
    ],
    limitations: [],
  },
  {
    id: "cece60a9-8e50-4d00-b91e-7a93c0c1229f",
    name: "AWS Lambda",
    description:
      "AWS Lambda vous permet d'exécuter du code sans avoir à mettre en service ou gérer des serveurs. Vous payez uniquement pour le temps de calcul consommé, aucuns frais ne s'appliquent lorsque votre code n'est pas exécuté.",
    shortname: "Lambda",
    availability: Availability.AVAILABLE,
    levers: [
      "Optimisation du code source pour réduire un maximum le temps d'éxécution",
      "Right Sizing des ressources allouées aux Lambda",
    ],
    limitations: [],
  },
];
