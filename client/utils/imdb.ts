import axios from "axios";

async function getMovieDetails(imdbId: string) {
  const baseUrl = "https://www.imdb.com/title";
  try {
    const response = await axios.get(`${baseUrl}/${imdbId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
    });

    const scriptMatch = response.data.match(
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
    );
    

    if (!scriptMatch) {
      throw new Error("Movie details JSON not found");
    }

    const jsonData = JSON.parse(scriptMatch[1]);
    const aboveTheFoldData = jsonData.props.pageProps.aboveTheFoldData;
    const mainColumnData = jsonData.props.pageProps.mainColumnData;

  
    return {
      // Basic Info
      id: imdbId,
      url: `https://www.imdb.com/title/${imdbId}/`,
      title: aboveTheFoldData.titleText?.text || null,
      originalTitle: aboveTheFoldData.originalTitleText?.text || null,
      fullTitle: aboveTheFoldData.primaryImage?.caption?.plainText || null,
      type: aboveTheFoldData.titleType?.text || null,
      description: aboveTheFoldData.plot?.plotText?.plainText || null,
      isAdult: aboveTheFoldData.isAdult || false,

      // Media
      primaryImage: aboveTheFoldData.primaryImage || null,
      images:
        mainColumnData.titleMainImages?.edges?.map((edge: any) => ({
          id: edge.node.id,
          url: edge.node.url,
          caption: edge.node.caption?.plainText,
          dimensions: { width: edge.node.width, height: edge.node.height },
        })) || [],
      videos:
        aboveTheFoldData.primaryVideos?.edges?.map((edge : any) => ({
          id: edge.node.id,
          name: edge.node.name?.text,
          runtime: edge.node.runtime?.value,
          url: `https://www.imdb.com/video/${edge.node.id}`,
        })) || [],

      // Release Info
      releaseDate: aboveTheFoldData.releaseDate?.day
        ? new Date(
            aboveTheFoldData.releaseDate.year,
            aboveTheFoldData.releaseDate.month - 1,
            aboveTheFoldData.releaseDate.day
          ).toISOString()
        : null,
      yearRange: {
        start: aboveTheFoldData.releaseYear?.year || null,
        end: aboveTheFoldData.releaseYear?.endYear || null,
      },
      countriesOfOrigin:
        aboveTheFoldData.countriesOfOrigin?.countries?.map((c: any) => ({
          id: c.id,
          name: c.text,
        })) || [],
      languages:
        aboveTheFoldData.spokenLanguages?.spokenLanguages?.map((l: any) => ({
          id: l.id,
          name: l.text,
        })) || [],
      filmingLocations:
        mainColumnData.filmingLocations?.edges?.map((edge: any) => ({
          location: edge.node.text,
          attributes: edge.node.attributes,
        })) || [],

      // Production
      productionCompanies:
        aboveTheFoldData.production?.edges?.map((edge: any) => ({
          id: edge.node.company.id,
          name: edge.node.company.companyText.text,
        })) || [],
      producers:
        mainColumnData.production?.edges
          ?.filter((edge: any) => edge.node.category?.text === "Producer")
          ?.map((edge:  any) => ({
            id: edge.node.name.id,
            name: edge.node.name.nameText.text,
          })) || [],
      directors:
        aboveTheFoldData.directorsPageTitle?.[0]?.credits?.map((person: any) => ({
          id: person.name.id,
          name: person.name.nameText.text,
          image: person.name.primaryImage?.url,
        })) || [],
      writers:
        aboveTheFoldData.writers?.map((writer: any) => ({
          id: writer.name.id,
          name: writer.name.nameText.text,
          category: writer.category?.text,
        })) || [],

      // Cast & Crew
      cast:
        mainColumnData.cast?.edges?.map((edge: any) => ({
          id: edge.node.name.id,
          name: edge.node.name.nameText.text,
          image: edge.node.name.primaryImage?.url,
          character: edge.node.characters?.[0]?.name || null,
          attributes: edge.node.attributes,
          episodeCount: edge.node.episodeCredits?.total,
        })) || [],
      actors:
        mainColumnData.cast?.edges
          ?.filter(
            (edge: any) =>
              edge.node.category?.id === "actor" ||
              edge.node.category?.id === "actress"
          )
          ?.map((edge: any) => ({
            id: edge.node.name.id,
            name: edge.node.name.nameText.text,
            role: edge.node.characters?.[0]?.name || null,
          })) || [],

      // Technical Specs
      runtime: {
        seconds: aboveTheFoldData.runtime?.seconds || null,
        display:
          aboveTheFoldData.runtime?.displayableProperty?.value?.plainText ||
          null,
      },
      technicalSpecs: {
        color:
          mainColumnData.technicalSpecifications?.colorations?.[0]?.text ||
          null,
        soundMix:
          mainColumnData.technicalSpecifications?.soundMixes?.[0]?.text || null,
        aspectRatio:
          mainColumnData.technicalSpecifications?.aspectRatios?.[0]?.text ||
          null,
      },

      // Financials
      budget: aboveTheFoldData.productionBudget?.budget?.amount || null,
      boxOffice: {
        openingWeekend: aboveTheFoldData.openingWeekendGross?.amount || null,
        gross: aboveTheFoldData.worldwideGross?.amount || null,
        lifetimeGross: aboveTheFoldData.lifetimeGross?.amount || null,
      },

      // Ratings & Reviews
      ratings: {
        average: aboveTheFoldData.ratingsSummary?.aggregateRating || null,
        count: aboveTheFoldData.ratingsSummary?.voteCount || 0,
        topRanking: mainColumnData.ratingsSummary?.topRanking || null,
        meterRanking: {
          current: aboveTheFoldData.meterRanking?.currentRank || null,
          change: aboveTheFoldData.meterRanking?.rankChange?.difference || 0,
          direction:
            aboveTheFoldData.meterRanking?.rankChange?.changeDirection ||
            "FLAT",
        },
      },
      reviews: {
        total: aboveTheFoldData.reviews?.total || 0,
        featured:
          mainColumnData.featuredReviews?.edges?.map((edge: any) => ({
            id: edge.node.id,
            author: {
              id: edge.node.author?.userId,
              name: edge.node.author?.nickName,
            },
            content: {
              summary: edge.node.summary?.originalText,
              fullText: edge.node.text?.originalText?.plainText,
            },
            rating: edge.node.authorRating,
            date: edge.node.submissionDate,
            helpfulness: {
              upVotes: edge.node.helpfulness?.upVotes || 0,
              downVotes: edge.node.helpfulness?.downVotes || 0,
            },
          })) || [],
        senders:
          mainColumnData.reviews?.edges
            ?.filter((edge: any) => edge.node.author)
            ?.map((edge: any) => ({
              id: edge.node.author.userId,
              name: edge.node.author.nickName,
              reviewCount: edge.node.author.reviewCount,
            })) || [],
      },

      // Additional Content
      genres: aboveTheFoldData.genres?.genres?.map((g: any) => g.text) || [],
      keywords:
        aboveTheFoldData.keywords?.edges?.map((edge: any) => edge.node.text) || [],
      similarTitles:
        mainColumnData.moreLikeThisTitles?.edges?.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.titleText.text,
          type: edge.node.titleType.text,
          year: edge.node.releaseYear.year,
          rating: edge.node.ratingsSummary?.aggregateRating,
          image: edge.node.primaryImage?.url,
        })) || [],

      // External References
      externalLinks:
        aboveTheFoldData.detailsExternalLinks?.edges?.map((edge: any) => ({
          url: edge.node.url,
          type: edge.node.label,
        })) || [],

      // Production Status
      productionStatus: {
        current:
          aboveTheFoldData.productionStatus?.currentProductionStage?.text ||
          null,
        history:
          aboveTheFoldData.productionStatus?.productionStatusHistory?.map(
            (item: any) => ({
              status: item.status.text,
              date: item.date,
            })
          ) || [],
      },

      // Awards
      awards: {
        wins: mainColumnData.wins?.total || 0,
        nominations: mainColumnData.nominationsExcludeWins?.total || 0,
      },

      // Engagement
      engagement: {
        watchlistCount:
          aboveTheFoldData.engagementStatistics?.watchlistStatistics
            ?.displayableCount?.text || "0",
        popularityRank: aboveTheFoldData.meterRanking?.currentRank || null,
      },
    };
  } catch (error: any) {
    console.error("Error getting movie details:", error.message);
    throw new Error("Failed to fetch movie details");
  }
}

export default getMovieDetails;
