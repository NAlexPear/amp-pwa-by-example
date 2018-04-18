import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Typography,
} from 'material-ui';
import React from 'react';
import { items } from '../../../../related_articles.json';


const mapArticle = (props, index) =>
  <Article key={ index } { ...props } />;

const Article = ({ title, thumbnail }) =>
  <Card style={ { margin: '1rem' } }>
    <CardMedia image={ thumbnail } style={ { height: '150px' } } />
    <CardHeader title={ title }/>
    <CardActions>
      <a href='./article'>
        <Typography variant='caption'>
          READ MORE
        </Typography>
      </a>
    </CardActions>
  </Card>;

const RelatedArticles = () =>
  items.map(mapArticle);

export default RelatedArticles;
