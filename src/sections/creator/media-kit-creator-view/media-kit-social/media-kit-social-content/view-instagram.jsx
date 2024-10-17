import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { keyframes } from '@emotion/react';

import { Box, Grid, Stack, useTheme, CardMedia, Typography, useMediaQuery } from '@mui/material';

// Utility function to format numbers
export const formatNumber = (num) => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}G`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const typeAnimation = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const TopContentGrid = ({ topContents }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const topFiveContents = topContents.slice(0, 5);

  return (
    <Grid container spacing={isMobile ? 1 : 2}>
      {topFiveContents.map((content, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 1,
              '&:hover .image': {
                opacity: 0,
              },
              '&:hover .description': {
                opacity: 1,
              },
            }}
          >
            <CardMedia
              component="img"
              image={content.image_url}
              alt={`Top content ${index + 1}`}
              sx={{
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                transition: 'opacity 0.3s ease-in-out',
              }}
              className="image"
            />
            <Box
              className="description"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                p: isMobile ? 1 : 2,
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'justify',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: 'vertical',
                  animation: `${typeAnimation} 0.5s steps(40, end)`,
                  fontSize: isMobile ? '0.75rem' : '0.875rem', // Smaller font size on mobile
                }}
              >
                {content.description}
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                p: isMobile ? 0.5 : 1,
              }}
            >
              <Stack direction="row" justifyContent="space-around">
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Icon icon="mdi:heart" width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
                  <Typography variant="caption" sx={{ fontSize: isMobile ? 16 : 14 }}>
                    {formatNumber(content.like)}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Icon icon="mdi:comment" width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
                  <Typography variant="caption" sx={{ fontSize: isMobile ? 16 : 14 }}>
                    {formatNumber(content.comment)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

TopContentGrid.propTypes = {
  topContents: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const MediaKitSocialContent = ({ instagram }) => {
  // const [socialMediaData, setSocialMediaData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [fetchError, setFetchError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // const getButtonText = () => {
  //   if (loading) return 'Fetching...';
  //   return socialMediaData ? 'Refresh Instagram & Tiktok Data' : 'Fetch Instagram & Tiktok Data';
  // };

  // const fetchExistingSocialMediaData = async () => {
  //   setLoading(true);
  //   setFetchError(null);
  //   try {
  //     const existingDataResponse = await axiosInstance.get(
  //       endpoints.creators.getCreatorSocialMediaData
  //     );
  //     if (existingDataResponse.data && Object.keys(existingDataResponse.data).length > 0) {
  //       setSocialMediaData(existingDataResponse.data);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching existing social media data:', err);
  //     setFetchError(err.message || 'Failed to fetch existing social media data');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const crawlSocialMediaData = async (instagramUsername, tiktokUsername) => {
  //   const crawlPlatform = async (platform, username) => {
  //     if (!username) return null;
  //     try {
  //       const response = await axiosInstance.post(endpoints.creators.getCreatorCrawler, {
  //         identifier: username,
  //         platform,
  //       });
  //       return response.data;
  //     } catch (err) {
  //       console.error(`Error crawling ${platform} data:`, err.response?.data || err.message);
  //       return null; // Return null instead of throwing, so we can still process other platforms
  //     }
  //   };

  //   const [instagramData, tiktokData] = await Promise.all([
  //     crawlPlatform('Instagram', instagramUsername),
  //     crawlPlatform('TikTok', tiktokUsername),
  //   ]);

  //   return {
  //     instagram: instagramData,
  //     tiktok: tiktokData,
  //   };
  // };

  // const fetchNewSocialMediaData = async () => {
  //   setLoading(true);
  //   setFetchError(null);
  //   try {
  //     const userResponse = await axiosInstance.get(endpoints.auth.getCurrentUser);

  //     if (!userResponse.data.user || !userResponse.data.user.creator) {
  //       throw new Error('Creator profile not found. Please complete your profile setup.');
  //     }

  //     const { instagram, tiktok } = userResponse.data.user.creator;

  //     if (!instagram && !tiktok) {
  //       throw new Error(
  //         'No social media usernames found. Please add your Instagram or TikTok username in your profile.'
  //       );
  //     }

  //     const newSocialMediaData = await crawlSocialMediaData(instagram, tiktok);

  //     if (!newSocialMediaData.instagram && !newSocialMediaData.tiktok) {
  //       throw new Error(
  //         'Failed to fetch social media data. The service might be temporarily unavailable.'
  //       );
  //     }

  //     // Update the creator's social media data in the backend
  //     await axiosInstance.put(endpoints.auth.updateCreator, {
  //       id: userResponse.data.user.id,
  //       socialMediaData: newSocialMediaData,
  //     });

  //     setSocialMediaData(newSocialMediaData);
  //   } catch (err) {
  //     setFetchError(err.message || 'Failed to fetch new social media data');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchExistingSocialMediaData();
  // }, []);

  // if (loading) {
  //   return <CircularProgress />;
  // }

  // const renderDataOrPlaceholder = (data, placeholder) => data || placeholder;

  return (
    <Box>
      {/* <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        {fetchError && (
          <Alert severity="error" sx={{ flexGrow: 1 }}>
            <AlertTitle>Error</AlertTitle>
            {fetchError}
            {fetchError.includes('service might be temporarily unavailable') && (
              <span> Please try again later.</span>
            )}
          </Alert>
        )}
      </Stack> */}

      {/* <Grid container spacing={isMobile ? 1 : 2} mb={isMobile ? 2 : 4}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ p: isMobile ? 1 : 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontSize: isMobile ? 12 : 14 }}>
              Followers
            </Typography>
            <Typography variant="h2" sx={{ fontSize: isMobile ? 40 : 20 }}>
              {instagram?.data.followers ? formatNumber(instagram.data.followers) : 'No data'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ p: isMobile ? 1 : 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontSize: isMobile ? 12 : 14 }}>
              Engagement Rate
            </Typography>
            <Typography variant="h2" sx={{ fontSize: isMobile ? 40 : 20 }}>
              {instagram?.data.engagement_rate
                ? `${Number(instagram.data.engagement_rate).toFixed(2)}%`
                : 'No data'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ p: isMobile ? 1 : 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontSize: isMobile ? 12 : 14 }}>
              Average Likes
            </Typography>
            <Typography variant="h2" sx={{ fontSize: isMobile ? 40 : 20 }}>
              {instagram?.data.user_performance?.avg_likes_per_post
                ? formatNumber(instagram.data.user_performance.avg_likes_per_post)
                : 'No data'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" mb={isMobile ? 1 : 2} sx={{ fontSize: isMobile ? 18 : 20 }}>
        Top Content
      </Typography> */}
      {instagram?.data.top_contents ? (
        <TopContentGrid topContents={instagram.data.top_contents} />
      ) : (
        <Typography>No top content data available</Typography>
      )}
    </Box>
  );
};

export default MediaKitSocialContent;

MediaKitSocialContent.propTypes = {
  instagram: PropTypes.object,
};
