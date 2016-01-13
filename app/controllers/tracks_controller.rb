class TracksController < ApplicationController

  def index
    client = AmazonRetrievalJob.make_client
    bucket_contents = AmazonRetrievalJob.get_bucket_contents(client)
    folder_array = AmazonRetrievalJob.add_objects_to_folder(bucket_contents)
    AmazonRetrievalJob.create_tracks_from_folders(folder_array)

    @tracks = Track.all
    @categories = Category.all
    # puts @categories
    # # respond_with @tracks
    # render :json => @tracks
    # #@tracks_json = @tracks.to_json
    # # respond_to do |format|
    # #   format.json { render :json => { :tracks => @tracks }}
    # # end
  end

  def edit
  end

end
