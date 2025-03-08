import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  useTheme,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Check as CheckIcon,
  Public as PublicIcon,
} from '@mui/icons-material';

interface Country {
  code: string;
  name: string;
  languages: {
    code: string;
    name: string;
    isDefault: boolean;
  }[];
  resumeStandards?: {
    personalInfo: {
      includePhoto: boolean;
      includeAddress: boolean;
      includeAge: boolean;
      includeMaritalStatus: boolean;
      includeNationality: boolean;
    };
    format: {
      preferredLength: number;
      dateFormat: string;
      educationFirst: boolean;
      includeReferences: boolean;
      includeHobbies: boolean;
    };
    naming: {
      resumeAlternativeNames: string[];
      preferredName: string;
    };
  };
  active: boolean;
}

interface CountrySelectorProps {
  countries: Country[];
  onSelect?: (country: Country) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  onSelect,
}) => {
  const theme = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [expanded, setExpanded] = useState(false);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    if (onSelect) {
      onSelect(country);
    }
    setExpanded(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Get popular countries first
  const popularCountryCodes = ['us', 'uk', 'ca', 'au', 'de', 'fr'];
  const popularCountries = countries.filter((country) =>
    popularCountryCodes.includes(country.code)
  );
  const otherCountries = countries.filter(
    (country) => !popularCountryCodes.includes(country.code)
  );

  // Sort countries by name
  const sortedPopularCountries = [...popularCountries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedOtherCountries = [...otherCountries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <Box>
      <Grid container spacing={2}>
        {sortedPopularCountries.map((country) => (
          <Grid item xs={6} sm={4} md={4} key={country.code}>
            <Card
              sx={{
                border:
                  selectedCountry?.code === country.code
                    ? `2px solid ${theme.palette.primary.main}`
                    : '1px solid transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardActionArea onClick={() => handleCountryClick(country)}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={`/images/flags/${country.code}.png`}
                    alt={`${country.name} flag`}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      mb: 1,
                    }}
                  />
                  <Typography variant="subtitle1" align="center">
                    {country.name}
                  </Typography>
                  {selectedCountry?.code === country.code && (
                    <CheckIcon
                      color="primary"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    />
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {sortedOtherCountries.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mb: 1,
            }}
            onClick={handleExpandClick}
          >
            <PublicIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="subtitle1">Other Countries</Typography>
            {expanded ? (
              <ExpandLessIcon sx={{ ml: 'auto' }} />
            ) : (
              <ExpandMoreIcon sx={{ ml: 'auto' }} />
            )}
          </Box>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid container spacing={2}>
              {sortedOtherCountries.map((country) => (
                <Grid item xs={6} sm={4} md={3} key={country.code}>
                  <Card
                    sx={{
                      border:
                        selectedCountry?.code === country.code
                          ? `2px solid ${theme.palette.primary.main}`
                          : '1px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardActionArea onClick={() => handleCountryClick(country)}>
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          p: 2,
                        }}
                      >
                        <Box
                          component="img"
                          src={`/images/flags/${country.code}.png`}
                          alt={`${country.name} flag`}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            mb: 1,
                          }}
                        />
                        <Typography variant="body2" align="center">
                          {country.name}
                        </Typography>
                        {selectedCountry?.code === country.code && (
                          <CheckIcon
                            color="primary"
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                          />
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Box>
      )}

      {selectedCountry && selectedCountry.resumeStandards && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {selectedCountry.name} Resume Standards
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Personal Information
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Photo"
                    secondary={
                      selectedCountry.resumeStandards.personalInfo.includePhoto
                        ? 'Include a professional photo'
                        : 'Do not include a photo'
                    }
                  />
                  <Chip
                    label={
                      selectedCountry.resumeStandards.personalInfo.includePhoto
                        ? 'Required'
                        : 'Not Required'
                    }
                    size="small"
                    color={
                      selectedCountry.resumeStandards.personalInfo.includePhoto
                        ? 'primary'
                        : 'default'
                    }
                    variant={
                      selectedCountry.resumeStandards.personalInfo.includePhoto
                        ? 'filled'
                        : 'outlined'
                    }
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Age/Date of Birth"
                    secondary={
                      selectedCountry.resumeStandards.personalInfo.includeAge
                        ? 'Include your date of birth'
                        : 'Do not include your age or date of birth'
                    }
                  />
                  <Chip
                    label={
                      selectedCountry.resumeStandards.personalInfo.includeAge
                        ? 'Required'
                        : 'Not Required'
                    }
                    size="small"
                    color={
                      selectedCountry.resumeStandards.personalInfo.includeAge
                        ? 'primary'
                        : 'default'
                    }
                    variant={
                      selectedCountry.resumeStandards.personalInfo.includeAge
                        ? 'filled'
                        : 'outlined'
                    }
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Marital Status"
                    secondary={
                      selectedCountry.resumeStandards.personalInfo
                        .includeMaritalStatus
                        ? 'Include your marital status'
                        : 'Do not include your marital status'
                    }
                  />
                  <Chip
                    label={
                      selectedCountry.resumeStandards.personalInfo
                        .includeMaritalStatus
                        ? 'Required'
                        : 'Not Required'
                    }
                    size="small"
                    color={
                      selectedCountry.resumeStandards.personalInfo
                        .includeMaritalStatus
                        ? 'primary'
                        : 'default'
                    }
                    variant={
                      selectedCountry.resumeStandards.personalInfo
                        .includeMaritalStatus
                        ? 'filled'
                        : 'outlined'
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" gutterBottom>
                Format
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Length"
                    secondary={`Preferred length: ${
                      selectedCountry.resumeStandards.format.preferredLength
                    } page${
                      selectedCountry.resumeStandards.format.preferredLength > 1
                        ? 's'
                        : ''
                    }`}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Date Format"
                    secondary={`Use ${selectedCountry.resumeStandards.format.dateFormat} format`}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Education Position"
                    secondary={
                      selectedCountry.resumeStandards.format.educationFirst
                        ? 'List education before work experience'
                        : 'List work experience before education'
                    }
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="References"
                    secondary={
                      selectedCountry.resumeStandards.format.includeReferences
                        ? 'Include references'
                        : 'References not needed or available upon request'
                    }
                  />
                  <Chip
                    label={
                      selectedCountry.resumeStandards.format.includeReferences
                        ? 'Include'
                        : 'Exclude'
                    }
                    size="small"
                    color={
                      selectedCountry.resumeStandards.format.includeReferences
                        ? 'primary'
                        : 'default'
                    }
                    variant={
                      selectedCountry.resumeStandards.format.includeReferences
                        ? 'filled'
                        : 'outlined'
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CountrySelector;
