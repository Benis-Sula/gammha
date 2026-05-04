-- CreateTable
CREATE TABLE "HeroSection" (
    "id" TEXT NOT NULL,
    "pageSlug" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goals" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "signs" TEXT[],
    "note" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceArticle" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResourceArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistic" (
    "id" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationTier" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "numericAmount" INTEGER NOT NULL,
    "headline" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonationTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "FocusArea" (
    "id" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FocusArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarningSign" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WarningSign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportChannel" (
    "id" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SupportChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvolvementOption" (
    "id" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "InvolvementOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PolicyItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalLink" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ExternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HeroSection_pageSlug_key" ON "HeroSection"("pageSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Condition_slug_key" ON "Condition"("slug");
